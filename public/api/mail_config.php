<?php
/**
 * Technobyte Innovations — Mail Configuration
 * 
 * Controls email dispatch settings for customer enquiries.
 * 
 * ⚠️  IMPORTANT: For email to work reliably on cPanel shared hosting:
 * 
 *   1. Set 'use_smtp' => true  (already done below)
 *   2. Enter the cPanel email password for enquiries@technobyteinnovations.in
 *      in the 'password' field below
 *   3. Upload this file to your server at /api/mail_config.php
 *   4. Test by visiting: https://technobyteinnovations.in/api/contact.php?test=1
 * 
 * You can find the SMTP settings in cPanel → Email Accounts → Connect Devices
 * or cPanel → Email Accounts → Set Up Mail Client.
 */

return [
    // ─── Recipient ───
    // Where customer enquiries and leads are delivered
    'to_email' => 'enquiries@technobyteinnovations.in',
    'to_name'  => 'Technobyte Innovations Enquiries',

    // ─── Sender Identity ───
    // MUST be a valid mailbox on the domain so SPF / Sender-Verify passes
    'from_email' => 'enquiries@technobyteinnovations.in',
    'from_name'  => 'Technobyte Innovations Website',

    // ─── Delivery Method ───
    // true = Use authenticated SMTP (RECOMMENDED for cPanel)
    // false = Use native PHP mail() (unreliable on most shared hosts)
    'use_smtp' => true,

    // ─── SMTP Configuration ───
    // Used when 'use_smtp' is true
    // Find these settings in cPanel → Email Accounts → Connect Devices
    'smtp' => [
        'host'       => 'mail.technobyteinnovations.in',  // Your cPanel mail server
        'port'       => 465,                               // 465 (SSL) or 587 (TLS)
        'encryption' => 'ssl',                             // 'ssl' for port 465, 'tls' for port 587
        'username'   => 'enquiries@technobyteinnovations.in',
        'password'   => '',   // ⚠️  ENTER YOUR cPanel EMAIL PASSWORD HERE
        'timeout'    => 30,
    ],

    // ─── Customer Confirmation ───
    // Send instant acknowledgment email back to the customer
    'send_customer_confirmation' => true,

    // ─── Debug Logging ───
    // Log all email delivery attempts to mail_debug.log (recommended while testing)
    'debug_logging' => true,
];
