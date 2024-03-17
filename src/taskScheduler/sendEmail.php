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
        $mail->Username = 'sandi.podrzaj@gmail.com'; // SMTP username
        $mail->Password = 'lxva cdtd pitt xhuk'; // SMTP password (specific for this app)
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to

        //Recipients
        $mail->setFrom('sandi.podrzaj@gmail.com', 'Mailer');
        $mail->addAddress($email); // Add a recipient

        //Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = 'Opomnik: Vnos ur';
        $mail->Body    = 'Za danes še nimaš vpisanih ur.<br>Prosim da to čim hitreje storiš.<br><br>Lep pozdrav,<br>Avtomati Armič';
        $mail->AltBody = "Za danes še nimaš vpisanih ur. Prosim da to čim hitreje storiš.\nLP\nAvtomati Armič";

        $mail->send();
        echo 'Message has been sent to ' . $email;
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
}
