<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$name = $_POST['name'] ?? null;
$group = $_POST['group'] ?? null;
$pass = hash("sha256", $_POST['pass']) ?? null;
$email = $_POST['email'] ?? null;
$preostanekDopusta = $_POST['preostanekDopusta'] ?? null;
$predvidenZacetek = $_POST['predvidenZacetek'] ?? null;
$superVodja = filter_var($_POST['superVodja'], FILTER_VALIDATE_BOOLEAN);


if ($name != null && $pass != null) {
$sql = "INSERT INTO zaposlen
(zaposleniIme, zaposleniSkupinaID, zaposleniPass, email, preostanekDopusta, predvidenZacetek, superVodja)
VALUES (:name, :group, :pass, :email, :preostanekDopusta, :predvidenZacetek, :superVodja)";
$stmt= $conn->prepare($sql);
$stmt->execute([
    'name' => $name,
    'group' => $group,
    'pass' => $pass,
    'email' => $email,
    'preostanekDopusta' => $preostanekDopusta,
    'predvidenZacetek' => $predvidenZacetek,
    'superVodja' => $superVodja
]);
}
