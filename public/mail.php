
<?php
// This file should be placed at the root of your Hostinger hosting

// Include PHPMailer classes (Hostinger has PHPMailer pre-installed)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Require the PHPMailer autoloader
require 'vendor/autoload.php';  // Adjust this path if needed on Hostinger

// Get form data
$subject = isset($_POST['subject']) ? $_POST['subject'] : 'New Contact Form Submission';
$name = isset($_POST['name']) ? $_POST['name'] : 'Unknown';
$email = isset($_POST['email']) ? $_POST['email'] : 'noemail@example.com';
$message = isset($_POST['message']) ? $_POST['message'] : 'No message provided';

// Create new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();                                      // Use SMTP
    $mail->Host       = 'smtp.hostinger.com';             // Hostinger SMTP server
    $mail->SMTPAuth   = true;                             // Enable SMTP authentication
    $mail->Username   = 'support@elitesitecreation.com';  // SMTP username (your Hostinger email)
    $mail->Password   = 'YOUR_EMAIL_PASSWORD';            // SMTP password (replace with actual password)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;   // Enable TLS encryption
    $mail->Port       = 465;                              // TCP port to connect to

    // Recipients
    $mail->setFrom('support@elitesitecreation.com', 'Elite Site Creation');
    $mail->addAddress('support@elitesitecreation.com');   // Add a recipient
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = "
        <html>
        <head>
          <title>New Contact Form Submission</title>
        </head>
        <body>
          <h2>You have received a new message from your website contact form.</h2>
          <table>
            <tr>
              <th style='text-align: left; padding: 8px;'>Name:</th>
              <td style='padding: 8px;'>{$name}</td>
            </tr>
            <tr>
              <th style='text-align: left; padding: 8px;'>Email:</th>
              <td style='padding: 8px;'>{$email}</td>
            </tr>
            <tr>
              <th style='text-align: left; padding: 8px;'>Subject:</th>
              <td style='padding: 8px;'>{$subject}</td>
            </tr>
            <tr>
              <th style='text-align: left; padding: 8px;'>Message:</th>
              <td style='padding: 8px;'>{$message}</td>
            </tr>
          </table>
        </body>
        </html>
    ";
    $mail->AltBody = "Name: {$name}\nEmail: {$email}\nSubject: {$subject}\nMessage: {$message}";

    // Send email
    $mail->send();
    
    // Return JSON success response
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    
} catch (Exception $e) {
    // Return JSON error response
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send email',
        'error' => $mail->ErrorInfo
    ]);
}
?>
