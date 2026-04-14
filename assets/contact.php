<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    echo "Bei Ihrer Anfrage ist ein Problem aufgetreten. Bitte versuchen Sie es erneut.";
    exit;
}

$email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
$subject_text = htmlspecialchars(strip_tags(trim($_POST["subject"] ?? "")));

if (isset($_POST["name"])) {
    $sender_name = htmlspecialchars(strip_tags(trim($_POST["name"])));
    $phone = "";
    $message = htmlspecialchars(strip_tags(trim($_POST["message"] ?? "")));
} else {
    $first_name = htmlspecialchars(strip_tags(trim($_POST["first-name"] ?? "")));
    $last_name = htmlspecialchars(strip_tags(trim($_POST["last-name"] ?? "")));
    $sender_name = trim($first_name . " " . $last_name);
    $phone = htmlspecialchars(strip_tags(trim($_POST["number"] ?? "")));
    $message = "";
}

if (empty($sender_name) || empty($email) || empty($subject_text) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Bitte füllen Sie das Formular vollständig aus und versuchen Sie es erneut.";
    exit;
}

$recipient = "info@infia.eu";
$subject = "Neue Anfrage: $subject_text";
$email_content = "Name: $sender_name\n";
$email_content .= "E-Mail: $email\n";
$email_content .= "Betreff: $subject_text\n";

if (!empty($phone)) {
    $email_content .= "Telefon: $phone\n";
}

if (!empty($message)) {
    $email_content .= "\nNachricht:\n$message\n";
}

$email_headers = "From: INFIA Website <info@infia.eu>\r\n";
$email_headers .= "Reply-To: $email\r\n";

if (mail($recipient, $subject, $email_content, $email_headers)) {
    http_response_code(200);
    echo "Vielen Dank! Ihre Nachricht wurde gesendet.";
} else {
    http_response_code(500);
    echo "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.";
}
?>
