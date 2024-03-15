<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

function sendEmailNotification($email) {
    $mail = new PHPMailer(true); // Passing `true` enables exceptions

    try {
        //Server settings
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'podrzaj.registracije@gmail.com'; // SMTP username
        $mail->Password = '9ZiEZzuy8QdhpPh'; // SMTP password
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to

        //Recipients
        $mail->setFrom('podrzaj.registracije@gmail.com', 'Mailer');
        $mail->addAddress($email); // Add a recipient

        //Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = 'Opomnik: Vnos ur';
        $mail->Body    = 'Za danes še nimaš vpisanih ur. Prosim da to čim hitreje storiš.';
        $mail->AltBody = 'Za danes še nimaš vpisanih ur. Prosim da to čim hitreje storiš.';

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
}
