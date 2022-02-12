<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$name = $_POST['name'];
$position = $_POST['position'];
$leader = $_POST['leader'];
echo $position;


if ($name != null) {
$sql = "INSERT INTO zaposleni (zaposleniIme, zaposleniPozicija, zaposleniVodja) VALUES (:name, :position, :leader)";
$stmt= $conn->prepare($sql);
$stmt->execute(['position' => $position, 'name' => $name, 'leader' => $leader]);
}
?>