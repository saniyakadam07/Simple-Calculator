<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $visitor_email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

    // Check if the email is valid
    if (!$visitor_email) {
        // Handle invalid email
        header("Location: contact.html?error=invalid-email");
        exit();
    }

    $email_from = 'info@parkeasy.com';
    $email_subject = 'New Form Submission'; 
    $email_body = "User Name: $name.\n".
                  "User Email: $visitor_email.\n".
                  "User Message: $message.\n";

    $to = 'ronitsahoo110@gmail.com';
    $headers = "From: $email_from \r\n";
    $headers .= "Reply-To: $visitor_email \r\n";

    // Send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Redirect on success
        header("Location: contact.html?success=true");
    } else {
        // Handle email sending failure
        header("Location: contact.html?error=email-failure");
    }
    exit();
}
?>
