<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$id = $_POST['id'];
$name = $_POST['updatedName'];
$skupina = $_POST['updatedSkupina'];

$sql = "UPDATE `zaposlen` SET zaposleniIme=?, zaposleniSkupinaID=? WHERE zaposleniID = ?";
$stmt= $conn->prepare($sql);
if ($stmt->execute([$name, $skupina, $id])){
    echo "Zaposleni številka " . $id . " je posodobljen.";
}
?>