<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$name = $_POST['name'];
$email = $_POST['email'];


if ($name != null) {
    $sql = "INSERT INTO skupine (skupinaIme, vodjaEmail) VALUES (:name, :email)";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['name' => $name, 'email' => $email]);
}
