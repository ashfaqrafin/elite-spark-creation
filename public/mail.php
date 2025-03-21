
<?php
// This file should be placed at the root of your Hostinger hosting

// Replace with your Hostinger email settings
$to_email = "support@elitesitecreation.com";
$subject = isset($_POST['subject']) ? $_POST['subject'] : 'New Contact Form Submission';
$name = isset($_POST['name']) ? $_POST['name'] : 'Unknown';
$email = isset($_POST['email']) ? $_POST['email'] : 'noemail@example.com';
$message = isset($_POST['message']) ? $_POST['message'] : 'No message provided';

// Headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: $name <$email>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

// Email body
$email_body = "
<html>
<head>
  <title>New Contact Form Submission</title>
</head>
<body>
  <h2>You have received a new message from your website contact form.</h2>
  <table>
    <tr>
      <th style='text-align: left; padding: 8px;'>Name:</th>
      <td style='padding: 8px;'>$name</td>
    </tr>
    <tr>
      <th style='text-align: left; padding: 8px;'>Email:</th>
      <td style='padding: 8px;'>$email</td>
    </tr>
    <tr>
      <th style='text-align: left; padding: 8px;'>Subject:</th>
      <td style='padding: 8px;'>$subject</td>
    </tr>
    <tr>
      <th style='text-align: left; padding: 8px;'>Message:</th>
      <td style='padding: 8px;'>$message</td>
    </tr>
  </table>
</body>
</html>
";

// Attempt to send the email
$success = mail($to_email, $subject, $email_body, $headers);

// Return JSON response
header('Content-Type: application/json');
if ($success) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>
