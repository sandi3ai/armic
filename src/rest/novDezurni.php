<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$date = $_POST['date'];
$name = $_POST['name'];

if ($name != null) {
$sql = "INSERT INTO dezurstva (dezurniDatum, dezurniIzvajalec) VALUES (:date, :name)";
$stmt= $conn->prepare($sql);
$stmt->execute(['date' => $date, 'name' => $name]);
}
?>