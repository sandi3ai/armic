<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$name = $_POST['name'];
$group = $_POST['group'];


if ($name != null) {
$sql = "INSERT INTO zaposlen (zaposleniIme, zaposleniSkupinaID) VALUES (:name, :group)";
$stmt= $conn->prepare($sql);
$stmt->execute(['name' => $name, 'group' => $group]);
}
?>