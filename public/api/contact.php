<?php
/**
 * Technobyte Innovations — Native PHP Mail API Handler
 * 
 * Handles incoming customer enquiries and project lead submissions
 * using native PHP mail().
 */

// Strict error reporting for debugging if needed, but suppressed output in response
error_reporting(0);
ini_set('display_errors', '0');

// CORS and response headers
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With');

// Respond to preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Ensure request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Only POST requests are accepted.'
    ]);
    exit;
}

// Configuration
$toEmail = 'enquiries@technobyteinnovations.in';
$siteName = 'Technobyte Innovations';
$senderDomain = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'technobyteinnovations.in';
$fromEmail = 'noreply@' . preg_replace('/^www\./i', '', $senderDomain);

// Parse input payload (JSON or Form POST)
$rawInput = file_get_contents('php://input');
$inputData = json_decode($rawInput, true);

if (!is_array($inputData)) {
    $inputData = $_POST;
}

// Extract and sanitize fields
function sanitize_text($value, $multiline = false) {
    if (!is_string($value)) return '';
    $clean = trim($value);
    // Remove null bytes
    $clean = str_replace(chr(0), '', $clean);
    if (!$multiline) {
        // Prevent header injection: strip newlines
        $clean = str_replace(["\r", "\n"], ' ', $clean);
    }
    return htmlspecialchars($clean, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$name        = sanitize_text($inputData['name'] ?? $inputData['Name'] ?? '');
$email       = trim($inputData['email'] ?? $inputData['Email'] ?? '');
$phone       = sanitize_text($inputData['phone'] ?? $inputData['Phone'] ?? '');
$company     = sanitize_text($inputData['company'] ?? $inputData['Company'] ?? '');
$projectType = sanitize_text($inputData['projectType'] ?? $inputData['ProjectType'] ?? $inputData['service'] ?? '');
$budget      = sanitize_text($inputData['budget'] ?? $inputData['Budget'] ?? '');
$message     = sanitize_text($inputData['message'] ?? $inputData['Message'] ?? $inputData['comments'] ?? '', true);
$customSubj  = sanitize_text($inputData['_subject'] ?? '');

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}

if (empty($message) && empty($projectType)) {
    $errors[] = 'Please provide details about your project or message.';
}

// Prevent header injection through email
if (preg_match("/[\r\n]/", $email)) {
    $errors[] = 'Invalid email format.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => implode(' ', $errors),
        'errors' => $errors
    ]);
    exit;
}

// Prepare Subject
$subject = $customSubj;
if (empty($subject)) {
    if (!empty($projectType)) {
        $subject = "New Project Enquiry: {$projectType} from {$name}";
    } else {
        $subject = "New Customer Enquiry from {$name}";
    }
}

// Build HTML email template for Admin
$currentTime = date('d M Y, h:i A T');
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

$htmlContent = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <title>" . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . "</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b12; color: #f0f0f5; margin: 0; padding: 24px 16px; }
    .container { max-width: 620px; margin: 0 auto; background-color: #12121c; border: 1px solid #26263a; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #1b1b2d 0%, #0d0d18 100%); padding: 28px 24px; border-bottom: 2px solid #baff29; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; color: #ffffff; letter-spacing: -0.02em; }
    .header p { margin: 0; font-size: 13px; color: #baff29; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
    .content { padding: 24px; }
    .field-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .field-table td { padding: 12px 14px; border-bottom: 1px solid #1f1f2e; vertical-align: top; font-size: 14px; }
    .field-table tr:last-child td { border-bottom: none; }
    .label { color: #9da0b5; font-weight: 600; width: 32%; text-transform: uppercase; font-size: 11px; letter-spacing: 0.06em; }
    .value { color: #ffffff; font-weight: 500; }
    .value a { color: #baff29; text-decoration: none; }
    .message-box { background: #08080f; border: 1px solid #232336; border-radius: 8px; padding: 16px; color: #e2e2ee; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 6px; }
    .footer { background-color: #0d0d16; padding: 16px 24px; border-top: 1px solid #1f1f2e; font-size: 12px; color: #727288; display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <p>Technobyte Innovations · Incoming Lead</p>
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
    $htmlContent .= "
        <tr>
          <td class='label'>Phone / WhatsApp</td>
          <td class='value'><a href='tel:{$phone}'>{$phone}</a></td>
        </tr>";
}

if (!empty($company)) {
    $htmlContent .= "
        <tr>
          <td class='label'>Company / Org</td>
          <td class='value'>{$company}</td>
        </tr>";
}

if (!empty($projectType)) {
    $htmlContent .= "
        <tr>
          <td class='label'>Project Category</td>
          <td class='value'><span style='display:inline-block; background:#1e1a38; color:#a59bfb; padding:3px 8px; border-radius:4px; font-weight:600; font-size:12px;'>{$projectType}</span></td>
        </tr>";
}

if (!empty($budget)) {
    $htmlContent .= "
        <tr>
          <td class='label'>Estimated Budget</td>
          <td class='value'><span style='color:#baff29; font-weight:700;'>{$budget}</span></td>
        </tr>";
}

if (!empty($message)) {
    $htmlContent .= "
        <tr>
          <td class='label'>Project Scope / Message</td>
          <td class='value'><div class='message-box'>{$message}</div></td>
        </tr>";
}

$htmlContent .= "
      </table>
    </div>
    <div class='footer'>
      <span>Submitted: {$currentTime}</span>
      <span>IP: {$ipAddress}</span>
    </div>
  </div>
</body>
</html>";

// Headers for Admin Email
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . $siteName . ' <' . $fromEmail . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion()
];

// Send Admin Email
$mailSent = @mail($toEmail, $subject, $htmlContent, implode("\r\n", $headers));

// Optionally send a clean confirmation email to the client
if ($mailSent) {
    $clientSubject = "Thank you for contacting Technobyte Innovations";
    $clientHtml = "
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b12; color: #e2e2ee; margin: 0; padding: 24px 16px; }
        .container { max-width: 580px; margin: 0 auto; background-color: #12121c; border: 1px solid #26263a; border-radius: 12px; overflow: hidden; }
        .header { background: #161626; padding: 24px; border-bottom: 2px solid #baff29; }
        .header h1 { margin: 0; font-size: 20px; color: #ffffff; }
        .content { padding: 24px; font-size: 14px; line-height: 1.7; color: #d1d1e0; }
        .highlight { color: #baff29; font-weight: 600; }
        .footer { background: #0c0c16; padding: 16px 24px; border-top: 1px solid #1f1f2e; font-size: 12px; color: #727288; text-align: center; }
      </style>
    </head>
    <body>
      <div class='container'>
        <div class='header'>
          <h1>Technobyte Innovations</h1>
        </div>
        <div class='content'>
          <p>Hi <strong>{$name}</strong>,</p>
          <p>Thank you for reaching out to us. We have received your enquiry regarding <span class='highlight'>" . (!empty($projectType) ? $projectType : 'your software project') . "</span>.</p>
          <p>One of our lead solution architects will review your requirements and reach back out to you within <strong>15 minutes to 24 hours</strong> with an architectural overview and project estimate.</p>
          <p>If you have an urgent inquiry, you can also reach us directly via WhatsApp at <a href='https://wa.me/919995064344' style='color:#baff29;'>+91 99950 64344</a>.</p>
          <p style='margin-top: 24px;'>Best regards,<br><strong>Technobyte Innovations Team</strong><br><a href='https://technobyteinnovations.in' style='color:#7b70ff; text-decoration:none;'>technobyteinnovations.in</a></p>
        </div>
        <div class='footer'>
          Technobyte Innovations · Trivandrum, Kerala · Global Delivery
        </div>
      </div>
    </body>
    </html>";

    $clientHeaders = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $siteName . ' <' . $fromEmail . '>',
        'Reply-To: ' . $siteName . ' <' . $toEmail . '>',
        'X-Mailer: PHP/' . phpversion()
    ];

    @mail($email, $clientSubject, $clientHtml, implode("\r\n", $clientHeaders));
}

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your enquiry has been sent successfully. We will contact you shortly.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Unable to send email at this moment. Please try again or reach out on WhatsApp.'
    ]);
}
