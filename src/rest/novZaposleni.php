<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$name = $_POST['name'];
$group = $_POST['group'];
$pass = hash("sha256", $_POST['pass']);


if ($name != null && $pass != null) {
$sql = "INSERT INTO zaposlen (zaposleniIme, zaposleniSkupinaID, zaposleniPass) VALUES (:name, :group, :pass)";
$stmt= $conn->prepare($sql);
$stmt->execute(['name' => $name, 'group' => $group, 'pass' => $pass]);
}
?>