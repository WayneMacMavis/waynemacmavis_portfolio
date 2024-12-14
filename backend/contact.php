<?php

// Autoload dependencies
$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    die('Autoload file not found. Did you run composer install?');
}
require $autoloadPath;

// Use statements for clarity
use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Debugging: log the start of the script
$debugLogFile = __DIR__ . '/debug_log.txt';
file_put_contents($debugLogFile, "Script started\n", FILE_APPEND);

// CORS headers for React app communication
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
file_put_contents($debugLogFile, "Headers set\n", FILE_APPEND);

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

file_put_contents('debug_log.txt', "PHPMailer included\n", FILE_APPEND);

// Get JSON input from the React form
$data = json_decode(file_get_contents("php://input"));

file_put_contents('debug_log.txt', "Decoded input: " . print_r($data, true) . "\n", FILE_APPEND);

// Validate the input
if ($data && isset($data->name, $data->email, $data->message)) {
    $mail = new PHPMailer();

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USER']; // Your Gmail address
    $mail->Password = $_ENV['SMTP_PASS'];   // Replace with your App Password
    $mail->SMTPSecure = 'tls';               // Use `tls` or `ssl`
    $mail->Port = 587;                       // Port 587 for TLS or 465 for SSL

    file_put_contents('debug_log.txt', "SMTP configured\n", FILE_APPEND);

    // Email Content
    $mail->setFrom($_ENV['SMTP_USER'], 'Portfolio-Website'); // Sender
    $mail->addAddress($_ENV['SMTP_USER']);          // Recipient
    $mail->Subject = "New Contact Message from " . $data->name;
    $mail->Body = "Name: " . $data->name . "\nEmail: " . $data->email . "\nMessage: " . $data->message;

   // Set "Reply-To" to the user's email
   $mail->addReplyTo($data->email, $data->name);

   // Email Content
   $mail->Subject = "New Contact Message from " . $data->name;
   $mail->Body = "You have received a new message:\n\n" .
                 "Name: " . $data->name . "\n" .
                 "Email: " . $data->email . "\n" .
                 "Message:\n" . $data->message;

    file_put_contents('debug_log.txt', "Mail content set\n", FILE_APPEND);

    // Send the email and respond
    if ($mail->send()) {
        file_put_contents('debug_log.txt', "Mail sent successfully\n", FILE_APPEND);
        echo json_encode(["success" => true]);
    } else {
        file_put_contents('debug_log.txt', "Mail failed: " . $mail->ErrorInfo . "\n", FILE_APPEND);
        echo json_encode(["success" => false, "error" => $mail->ErrorInfo]);
    }
} else {
    file_put_contents('debug_log.txt', "Invalid input\n", FILE_APPEND);
    echo json_encode(["success" => false, "error" => "Invalid input."]);
}
