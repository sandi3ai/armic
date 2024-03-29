<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../../vendor/autoload.php';

function sendEmailNotification($email, $name, $logFile) {
    $mail = new PHPMailer(true); // Passing `true` enables exceptions
    $mail->CharSet = 'UTF-8'; // Explicitly set the charset to UTF-8

    try {
        //Server settings
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'sandi.podrzaj@gmail.com'; // SMTP username
        $mail->Password = 'lxva cdtd pitt xhuk'; // SMTP password (specific for this app)
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to

        //Recipients
        $mail->setFrom('sandi.podrzaj@gmail.com', 'Avtomati Armič Uprava');
        $mail->addAddress($email); // Add a recipient

        //Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = "Opomnik: Vnos ur za $name";
        $mail->Body    = "Pozdravljen/a $name,<br><br>Za danes še nimaš vpisanih ur. Prosim da to čim hitreje storiš.<br><br>Lep pozdrav,<br>Avtomati Armič";
        $mail->AltBody = "Pozdravljen/a $name,\n\nZa danes še nimaš vpisanih ur. Prosim da to čim hitreje storiš.\n\nLP\nAvtomati Armič";


        $mail->send();
        echo 'Message has been sent to ' . $email;
        file_put_contents($logFile, "Email sent to: " . $email . "\n", FILE_APPEND);
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        file_put_contents($logFile, "Email sending error: " . $e->getMessage() . "\n", FILE_APPEND);
    }
}
