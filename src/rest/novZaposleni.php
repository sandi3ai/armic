<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$name = $_POST['name'];
$group = $_POST['group'];
$pass = hash("sha256", $_POST['pass']);
$preostanekDopusta = $_POST['preostanekDopusta'];
$predvidenZacetek = $_POST['predvidenZacetek'];


if ($name != null && $pass != null) {
$sql = "INSERT INTO zaposlen (zaposleniIme, zaposleniSkupinaID, zaposleniPass, preostanekDopusta, predvidenZacetek)
VALUES (:name, :group, :pass, :preostanekDopusta, :predvidenZacetek)";
$stmt= $conn->prepare($sql);
$stmt->execute([
    'name' => $name,
    'group' => $group,
    'pass' => $pass,
    'preostanekDopusta' => $preostanekDopusta,
    'predvidenZacetek' => $predvidenZacetek
]);
}
?>