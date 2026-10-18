<?php
/**
 * Technobyte Innovations — Contact & Enquiry Mail API
 * 
 * Supports:
 * - Native pure-PHP socket SMTP (primary, most reliable on cPanel shared hosting).
 * - Native PHP mail() as fallback with correct Return-Path (-f flag).
 * - Multipart/alternative (plain-text + HTML) for maximum inbox deliverability.
 * - Diagnostic self-test via GET /api/contact.php?test=1
 * 
 * IMPORTANT: On cPanel shared hosting, SMTP mode is the most reliable way
 * to deliver emails. Set your mailbox password in mail_config.php.
 */

// Error handling settings
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
ini_set('display_errors', '0');

// Load optional custom configuration
$configFile = __DIR__ . '/mail_config.php';
$config = file_exists($configFile) ? require $configFile : [];

$toEmail      = $config['to_email'] ?? 'enquiries@technobyteinnovations.in';
$toName       = $config['to_name'] ?? 'Technobyte Innovations Enquiries';
$fromEmail    = $config['from_email'] ?? 'enquiries@technobyteinnovations.in';
$fromName     = $config['from_name'] ?? 'Technobyte Innovations Website';
$useSmtp      = $config['use_smtp'] ?? true;  // SMTP on by default for cPanel
$smtpConfig   = $config['smtp'] ?? [];
$sendConfirm  = $config['send_customer_confirmation'] ?? true;
$debugLogging = $config['debug_logging'] ?? true;

// Logger helper
function write_log($message) {
    global $debugLogging;
    if (!$debugLogging) return;
    $logFile = __DIR__ . '/mail_debug.log';
    $entry = '[' . date('Y-m-d H:i:s') . '] ' . $message . PHP_EOL;
    @file_put_contents($logFile, $entry, FILE_APPEND | LOCK_EX);
}

// -----------------------------------------------------------------------------
// Pure PHP Lightweight SMTP Client (zero composer dependencies)
// -----------------------------------------------------------------------------
function send_via_smtp($to, $subject, $body, $headersArray, $smtp) {
    $host = $smtp['host'] ?? 'localhost';
    $port = (int)($smtp['port'] ?? 465);
    $encryption = strtolower($smtp['encryption'] ?? 'ssl');
    $username = $smtp['username'] ?? '';
    $password = $smtp['password'] ?? '';
    $timeout = (int)($smtp['timeout'] ?? 30);

    // Determine connection protocol
    $protocol = '';
    if ($encryption === 'ssl') {
        $protocol = 'ssl://';
    }

    write_log("SMTP: Connecting to {$protocol}{$host}:{$port} (encryption: {$encryption})");

    // Create stream context with relaxed SSL for self-signed certs common on cPanel
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ]
    ]);

    $socket = @stream_socket_client(
        "{$protocol}{$host}:{$port}",
        $errno,
        $errstr,
        $timeout,
        STREAM_CLIENT_CONNECT,
        $context
    );

    if (!$socket) {
        write_log("SMTP: Connection FAILED to {$host}:{$port} — Error: {$errstr} ({$errno})");
        return false;
    }

    // Set socket timeout
    stream_set_timeout($socket, $timeout);

    $readResponse = function() use ($socket) {
        $data = '';
        while ($line = fgets($socket, 515)) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return trim($data);
    };

    $sendCommand = function($cmd, $expectCode = null) use ($socket, $readResponse) {
        fputs($socket, $cmd . "\r\n");
        $resp = $readResponse();
        write_log("SMTP >>> " . trim($cmd) . " | <<< " . substr($resp, 0, 80));
        return $resp;
    };

    // Read server greeting
    $resp = $readResponse();
    write_log("SMTP Greeting: " . substr($resp, 0, 80));
    if (substr($resp, 0, 3) !== '220') {
        write_log("SMTP: Bad greeting, aborting.");
        fclose($socket);
        return false;
    }

    // EHLO
    $ehloHost = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'technobyteinnovations.in';
    $resp = $sendCommand("EHLO {$ehloHost}");

    // STARTTLS if needed
    if ($encryption === 'tls') {
        $resp = $sendCommand('STARTTLS');
        if (substr($resp, 0, 3) === '220') {
            $cryptoOk = @stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_1_CLIENT | STREAM_CRYPTO_METHOD_TLS_CLIENT);
            if (!$cryptoOk) {
                write_log("SMTP: STARTTLS crypto upgrade FAILED");
                fclose($socket);
                return false;
            }
            $resp = $sendCommand("EHLO {$ehloHost}");
        } else {
            write_log("SMTP: Server does not support STARTTLS");
        }
    }

    // Authenticate
    if (!empty($username) && !empty($password)) {
        $resp = $sendCommand('AUTH LOGIN');
        if (substr($resp, 0, 3) !== '334') {
            write_log("SMTP: AUTH LOGIN rejected: {$resp}");
            fclose($socket);
            return false;
        }
        $sendCommand(base64_encode($username));
        $resp = $sendCommand(base64_encode($password));
        if (substr($resp, 0, 3) !== '235') {
            write_log("SMTP: Authentication FAILED: {$resp}");
            fclose($socket);
            return false;
        }
        write_log("SMTP: Authenticated successfully as {$username}");
    }

    // MAIL FROM
    global $fromEmail;
    $resp = $sendCommand("MAIL FROM: <{$fromEmail}>");
    if (substr($resp, 0, 3) !== '250') {
        write_log("SMTP: MAIL FROM rejected: {$resp}");
        fclose($socket);
        return false;
    }

    // RCPT TO
    $resp = $sendCommand("RCPT TO: <{$to}>");
    if (substr($resp, 0, 3) !== '250' && substr($resp, 0, 3) !== '251') {
        write_log("SMTP: RCPT TO rejected: {$resp}");
        fclose($socket);
        return false;
    }

    // DATA
    $resp = $sendCommand('DATA');
    if (substr($resp, 0, 3) !== '354') {
        write_log("SMTP: DATA start rejected: {$resp}");
        fclose($socket);
        return false;
    }

    // Build full message with headers
    $headerStr = '';
    foreach ($headersArray as $hdr) {
        $headerStr .= $hdr . "\r\n";
    }
    $headerStr .= "To: <{$to}>\r\n";
    $headerStr .= "Subject: {$subject}\r\n";

    // Dot-stuff the body (RFC 5321: lines starting with "." get ".." prepended)
    $escapedBody = str_replace("\r\n.", "\r\n..", $body);

    fputs($socket, $headerStr . "\r\n" . $escapedBody . "\r\n.\r\n");
    $resp = $readResponse();
    write_log("SMTP DATA response: " . substr($resp, 0, 80));

    if (substr($resp, 0, 3) !== '250') {
        write_log("SMTP: DATA content rejected: {$resp}");
        fclose($socket);
        return false;
    }

    $sendCommand('QUIT');
    fclose($socket);
    write_log("SMTP: Successfully delivered message to {$to}");
    return true;
}

// -----------------------------------------------------------------------------
// Unified Email Sender (SMTP primary → mail() fallback)
// -----------------------------------------------------------------------------
function send_email_dispatch($to, $subject, $textBody, $htmlBody, $replyToEmail, $replyToName) {
    global $toEmail, $fromEmail, $fromName, $useSmtp, $smtpConfig;

    $boundary = "==Part_" . md5(uniqid(microtime(), true));

    // Build headers array
    $msgId = '<' . time() . '.' . md5(uniqid(microtime(), true)) . '@technobyteinnovations.in>';
    $headers = [
        'Date: ' . date('r'),
        'Message-ID: ' . $msgId,
        'MIME-Version: 1.0',
        'From: ' . $fromName . ' <' . $fromEmail . '>',
        'Reply-To: ' . (!empty($replyToName) ? str_replace(['"', '\\'], '', $replyToName) . ' ' : '') . '<' . $replyToEmail . '>',
        'Return-Path: <' . $fromEmail . '>',
        'X-Mailer: TBI-ContactForm/2.0',
        'X-Priority: 1',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"'
    ];

    // Build multipart body (Plain Text + HTML)
    $fullBody  = "--{$boundary}\r\n";
    $fullBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $fullBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $fullBody .= $textBody . "\r\n\r\n";
    $fullBody .= "--{$boundary}\r\n";
    $fullBody .= "Content-Type: text/html; charset=UTF-8\r\n";
    $fullBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $fullBody .= $htmlBody . "\r\n\r\n";
    $fullBody .= "--{$boundary}--";

    // ── Method 1: Authenticated SMTP (most reliable on cPanel) ──
    if ($useSmtp && !empty($smtpConfig['host']) && !empty($smtpConfig['password'])) {
        write_log("Dispatch: Trying SMTP as primary method...");
        $smtpResult = send_via_smtp($to, $subject, $fullBody, $headers, $smtpConfig);
        if ($smtpResult) return true;
        write_log("Dispatch: SMTP failed, falling back to native mail()...");
    } elseif ($useSmtp) {
        write_log("Dispatch: SMTP enabled but password is empty — skipping SMTP, using mail()");
    }

    // ── Method 2: Native PHP mail() fallback ──
    // Build the -f parameter correctly (no quotes around the email address)
    $cleanFrom = filter_var($fromEmail, FILTER_SANITIZE_EMAIL);
    $additionalParams = "-f{$cleanFrom}";

    // Remove Return-Path from headers for mail() — it's set via -f
    $mailHeaders = array_filter($headers, function($h) {
        return stripos($h, 'Return-Path:') !== 0;
    });
    $headersCombined = implode("\r\n", $mailHeaders);

    write_log("Dispatch: Sending via native mail() to {$to} with -f{$cleanFrom}");
    $sent = @mail($to, $subject, $fullBody, $headersCombined, $additionalParams);

    if (!$sent) {
        // Try without -f parameter (some hosts block it)
        write_log("Dispatch: mail() with -f failed, retrying without -f...");
        $sent = @mail($to, $subject, $fullBody, $headersCombined);
    }

    if (!$sent) {
        $lastErr = error_get_last();
        $errText = $lastErr['message'] ?? 'Unknown mail() error';
        write_log("Dispatch: mail() returned FALSE for {$to}. PHP Error: {$errText}");
    } else {
        write_log("Dispatch: mail() returned TRUE for {$to}");
    }

    return $sent;
}

// -----------------------------------------------------------------------------
// Diagnostic Self-Test Route (GET /api/contact.php?test=1)
// -----------------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');

    $isTest = isset($_GET['test']) || isset($_GET['check']);
    $mailFunctionEnabled = function_exists('mail');
    $sendmailPath = ini_get('sendmail_path');

    // Auto-detect common SMTP hosts for cPanel
    $detectedSmtpHost = '';
    $serverHost = $_SERVER['SERVER_NAME'] ?? $_SERVER['HTTP_HOST'] ?? '';
    if (!empty($serverHost)) {
        $detectedSmtpHost = 'mail.' . preg_replace('/^www\./', '', $serverHost);
    }

    $statusData = [
        'status' => 'active',
        'api' => 'Technobyte Innovations Contact Mail API v2.0',
        'mail_function_enabled' => $mailFunctionEnabled,
        'php_version' => phpversion(),
        'server_ip' => $_SERVER['SERVER_ADDR'] ?? 'Unknown',
        'server_hostname' => gethostname() ?: 'Unknown',
        'destination_email' => $toEmail,
        'from_email' => $fromEmail,
        'smtp_enabled' => $useSmtp,
        'smtp_host' => $smtpConfig['host'] ?? 'Not configured',
        'smtp_port' => $smtpConfig['port'] ?? 'Not configured',
        'smtp_password_set' => !empty($smtpConfig['password']),
        'detected_smtp_host' => $detectedSmtpHost,
        'sendmail_path' => $sendmailPath ?: 'Default OS MTA',
    ];

    if ($isTest) {
        write_log("=== DIAGNOSTIC SELF-TEST INITIATED ===");
        $testSubject = "Diagnostic Test — Technobyte Innovations [" . date('H:i:s') . "]";
        $testText = "This is a diagnostic self-test email.\nTimestamp: " . date('Y-m-d H:i:s') . "\nServer: " . ($_SERVER['SERVER_NAME'] ?? 'local') . "\nSMTP Enabled: " . ($useSmtp ? 'YES' : 'NO') . "\nSMTP Password Set: " . (!empty($smtpConfig['password']) ? 'YES' : 'NO');
        $testHtml = "<div style='font-family:sans-serif; background:#0b0b12; color:#fff; padding:20px; border-radius:10px;'><h3 style='color:#baff29;'>✅ Diagnostic Test Email</h3><p>Your mail server successfully accepted and dispatched this test to <strong>{$toEmail}</strong>.</p><p style='color:#9d8bff;'>SMTP Enabled: " . ($useSmtp ? 'YES' : 'NO') . "</p><p><small style='color:#666;'>Timestamp: " . date('Y-m-d H:i:s') . "</small></p></div>";

        $testSent = send_email_dispatch($toEmail, $testSubject, $testText, $testHtml, $fromEmail, 'System Test');
        $statusData['test_dispatched'] = $testSent;
        $statusData['message'] = $testSent
            ? "✅ Test email accepted for delivery to {$toEmail}. Check your inbox (and spam folder) within 1-5 minutes."
            : "❌ Test delivery FAILED. Check mail_debug.log for details. Make sure SMTP password is set in mail_config.php.";

        if (!$testSent && !$useSmtp) {
            $statusData['recommendation'] = "Enable SMTP in mail_config.php by setting 'use_smtp' => true and providing your cPanel email password. Native mail() is unreliable on most shared hosts.";
        } elseif (!$testSent && empty($smtpConfig['password'])) {
            $statusData['recommendation'] = "SMTP is enabled but password is empty. Set the password for {$fromEmail} in mail_config.php.";
        }
    }

    echo json_encode($statusData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit;
}

// -----------------------------------------------------------------------------
// POST Handling (Customer Enquiries & Project Leads)
// -----------------------------------------------------------------------------
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Parse Input
$rawInput = file_get_contents('php://input');
$inputData = json_decode($rawInput, true);
if (!is_array($inputData)) {
    $inputData = $_POST;
}

// Sanitize helper
function clean_field($val, $multiline = false) {
    if (!is_string($val)) return '';
    $clean = trim($val);
    $clean = str_replace(chr(0), '', $clean);
    if (!$multiline) {
        $clean = str_replace(["\r", "\n"], ' ', $clean);
    }
    return htmlspecialchars($clean, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$name        = clean_field($inputData['name'] ?? $inputData['Name'] ?? '');
$email       = trim($inputData['email'] ?? $inputData['Email'] ?? '');
$phone       = clean_field($inputData['phone'] ?? $inputData['Phone'] ?? '');
$company     = clean_field($inputData['company'] ?? $inputData['Company'] ?? '');
$projectType = clean_field($inputData['projectType'] ?? $inputData['ProjectType'] ?? $inputData['service'] ?? '');
$budget      = clean_field($inputData['budget'] ?? $inputData['Budget'] ?? '');
$message     = clean_field($inputData['message'] ?? $inputData['Message'] ?? $inputData['comments'] ?? '', true);
$customSubj  = clean_field($inputData['_subject'] ?? '');

// Validate
$errors = [];
if (empty($name)) {
    $errors[] = 'Your name is required.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match("/[\r\n]/", $email)) {
    $errors[] = 'A valid email address is required.';
}
if (empty($message) && empty($projectType)) {
    $errors[] = 'Please provide details about your project or inquiry.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => implode(' ', $errors), 'errors' => $errors]);
    exit;
}

// Compose Subject
$subject = $customSubj;
if (empty($subject)) {
    if (!empty($projectType)) {
        $subject = "New Project Enquiry: {$projectType} from {$name}";
    } else {
        $subject = "New Customer Enquiry from {$name}";
    }
}

// Plain Text Body
$currentTime = date('d M Y, h:i A T');
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

$textBody = "TECHNOBYTE INNOVATIONS — INCOMING CUSTOMER ENQUIRY\n";
$textBody .= "=================================================\n\n";
$textBody .= "Client Name:   {$name}\n";
$textBody .= "Email Address: {$email}\n";
if (!empty($phone))       $textBody .= "Phone/WhatsApp:{$phone}\n";
if (!empty($company))     $textBody .= "Company:       {$company}\n";
if (!empty($projectType)) $textBody .= "Project Type:  {$projectType}\n";
if (!empty($budget))      $textBody .= "Budget Range:  {$budget}\n";
$textBody .= "\nMessage / Project Scope:\n";
$textBody .= str_repeat("-", 40) . "\n";
$textBody .= htmlspecialchars_decode($message, ENT_QUOTES) . "\n";
$textBody .= str_repeat("-", 40) . "\n\n";
$textBody .= "Submitted: {$currentTime}\n";
$textBody .= "Sender IP: {$ipAddress}\n";

// HTML Body
$htmlBody = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <title>" . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . "</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060608; color: #f0f0f5; margin: 0; padding: 24px 16px; }
    .container { max-width: 620px; margin: 0 auto; background-color: #0f0f18; border: 1px solid #222234; border-radius: 14px; overflow: hidden; box-shadow: 0 14px 40px rgba(0,0,0,0.6); }
    .header { background: linear-gradient(135deg, #181828 0%, #0c0c14 100%); padding: 28px 24px; border-bottom: 2px solid #baff29; }
    .header-tag { margin: 0 0 6px 0; font-size: 11px; color: #baff29; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; font-family: monospace; }
    .header h1 { margin: 0; font-size: 21px; color: #ffffff; letter-spacing: -0.02em; }
    .content { padding: 28px 24px; }
    .field-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .field-table td { padding: 12px 14px; border-bottom: 1px solid #1a1a28; vertical-align: top; font-size: 14px; }
    .field-table tr:last-child td { border-bottom: none; }
    .label { color: #9da0b5; font-weight: 600; width: 32%; text-transform: uppercase; font-size: 11px; letter-spacing: 0.08em; font-family: monospace; }
    .value { color: #ffffff; font-weight: 500; }
    .value a { color: #baff29; text-decoration: none; font-weight: 600; }
    .badge { display: inline-block; background: rgba(91, 78, 255, 0.18); border: 1px solid rgba(91, 78, 255, 0.4); color: #9d8bff; padding: 3px 10px; border-radius: 6px; font-weight: 600; font-size: 12px; }
    .budget-val { color: #baff29; font-weight: 700; font-size: 15px; }
    .message-box { background: #08080f; border: 1px solid #1f1f2e; border-radius: 8px; padding: 16px; color: #e2e2ee; font-size: 14px; line-height: 1.65; white-space: pre-wrap; margin-top: 6px; }
    .footer { background-color: #0b0b14; padding: 16px 24px; border-top: 1px solid #181826; font-size: 12px; color: #727288; display: flex; justify-content: space-between; font-family: monospace; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <div class='header-tag'>★ Technobyte Innovations · Incoming Lead</div>
      <h1>" . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . "</h1>
    </div>
    <div class='content'>
      <table class='field-table'>
        <tr>
          <td class='label'>Client Name</td>
          <td class='value'><strong>{$name}</strong></td>
        </tr>
        <tr>
          <td class='label'>Email Address</td>
          <td class='value'><a href='mailto:{$email}'>{$email}</a></td>
        </tr>";

if (!empty($phone)) {
    $htmlBody .= "
        <tr>
          <td class='label'>Phone / WhatsApp</td>
          <td class='value'><a href='tel:{$phone}'>{$phone}</a></td>
        </tr>";
}
if (!empty($company)) {
    $htmlBody .= "
        <tr>
          <td class='label'>Company / Org</td>
          <td class='value'>{$company}</td>
        </tr>";
}
if (!empty($projectType)) {
    $htmlBody .= "
        <tr>
          <td class='label'>Project Scope</td>
          <td class='value'><span class='badge'>{$projectType}</span></td>
        </tr>";
}
if (!empty($budget)) {
    $htmlBody .= "
        <tr>
          <td class='label'>Budget Range</td>
          <td class='value'><span class='budget-val'>{$budget}</span></td>
        </tr>";
}
if (!empty($message)) {
    $htmlBody .= "
        <tr>
          <td class='label'>Enquiry Details</td>
          <td class='value'><div class='message-box'>{$message}</div></td>
        </tr>";
}

$htmlBody .= "
      </table>
    </div>
    <div class='footer'>
      <span>Date: {$currentTime}</span>
      <span>Sender IP: {$ipAddress}</span>
    </div>
  </div>
</body>
</html>";

// Send Primary Email to Admin Inbox
write_log("=== NEW ENQUIRY from {$name} ({$email}) ===");
write_log("Subject: {$subject}");
$adminSent = send_email_dispatch($toEmail, $subject, $textBody, $htmlBody, $email, $name);

// Send Instant Auto-Acknowledgment to Customer
if ($adminSent && $sendConfirm) {
    $clientSubject = "We received your enquiry — Technobyte Innovations";
    $clientText = "Hi {$name},\n\nThank you for reaching out to Technobyte Innovations. We have received your inquiry regarding " . (!empty($projectType) ? $projectType : 'your software project') . ".\n\nOur solutions engineering desk will review your details and contact you within 15 minutes to 24 hours with an architecture overview and estimated timeline.\n\nIf your request is urgent, feel free to chat with us directly on WhatsApp: https://wa.me/919995064344\n\nBest regards,\nTechnobyte Innovations Team\nhttps://technobyteinnovations.in";

    $clientHtml = "
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060608; color: #e2e2ee; margin: 0; padding: 24px 16px; }
        .container { max-width: 580px; margin: 0 auto; background-color: #0f0f18; border: 1px solid #222234; border-radius: 12px; overflow: hidden; }
        .header { background: #141422; padding: 24px; border-bottom: 2px solid #baff29; }
        .header h1 { margin: 0; font-size: 20px; color: #ffffff; }
        .content { padding: 24px; font-size: 14px; line-height: 1.7; color: #d1d1e0; }
        .highlight { color: #baff29; font-weight: 600; }
        .btn-wa { display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; margin: 16px 0; }
        .footer { background: #0b0b14; padding: 16px 24px; border-top: 1px solid #1a1a28; font-size: 12px; color: #727288; text-align: center; }
      </style>
    </head>
    <body>
      <div class='container'>
        <div class='header'>
          <h1>Technobyte Innovations</h1>
        </div>
        <div class='content'>
          <p>Hi <strong>{$name}</strong>,</p>
          <p>Thank you for reaching out to us. We have received your inquiry regarding <span class='highlight'>" . (!empty($projectType) ? $projectType : 'your software project') . "</span>.</p>
          <p>Our solutions architecture desk is currently reviewing your project scope and will respond within <strong>15 minutes to 24 hours</strong> with an initial estimate and delivery roadmap.</p>
          <p>Need an immediate response? Connect directly with our team on WhatsApp:</p>
          <p><a href='https://wa.me/919995064344' class='btn-wa'>💬 Chat on WhatsApp (+91 99950 64344)</a></p>
          <p style='margin-top: 24px;'>Best regards,<br><strong>Technobyte Innovations Engineering Desk</strong><br><a href='https://technobyteinnovations.in' style='color:#7b70ff; text-decoration:none;'>technobyteinnovations.in</a></p>
        </div>
        <div class='footer'>
          Technobyte Innovations · Trivandrum, Kerala · Global Delivery
        </div>
      </div>
    </body>
    </html>";

    send_email_dispatch($email, $clientSubject, $clientText, $clientHtml, $toEmail, $fromName);
}

// Return JSON Response
if ($adminSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your enquiry has been received. Our team will contact you shortly.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Your enquiry could not be delivered by the server mail agent. Please connect with us directly on WhatsApp at +91 99950 64344.'
    ]);
}
