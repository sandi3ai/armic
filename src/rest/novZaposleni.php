<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$name = $_POST['name'];
$group = $_POST['group'];
$pass = hash("sha256", $_POST['pass']);
$email = $_POST['email'];
$preostanekDopusta = $_POST['preostanekDopusta'];
$predvidenZacetek = $_POST['predvidenZacetek'];


if ($name != null && $pass != null) {
$sql = "INSERT INTO zaposlen (zaposleniIme, zaposleniSkupinaID, zaposleniPass, email, preostanekDopusta, predvidenZacetek)
VALUES (:name, :group, :pass, :email, :preostanekDopusta, :predvidenZacetek)";
$stmt= $conn->prepare($sql);
$stmt->execute([
    'name' => $name,
    'group' => $group,
    'pass' => $pass,
    'email' => $email,
    'preostanekDopusta' => $preostanekDopusta,
    'predvidenZacetek' => $predvidenZacetek
]);
}
?>