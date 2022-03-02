<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$id = $_POST['id'];
$name = $_POST['updatedName'];
$skupina = $_POST['updatedSkupina'];
$pass =  hash("sha256", $_POST['updatedPass']);
/*
$sql = "UPDATE `zaposlen` SET zaposleniIme=?, zaposleniSkupinaID=? zaposleniPass=? WHERE zaposleniID = ?";
$stmt= $conn->prepare($sql);
if ($stmt->execute([$name, $skupina, $pass, $id])){
    echo "Zaposleni številka " . $id . " je posodobljen.";
}
*/
$data = [
    'id' => $id,
    'name' => $name,
    'skupina' => $skupina,
    'pass' => $pass,
];
$sql = "UPDATE `zaposlen` SET zaposleniIme=:name, zaposleniSkupinaID=:skupina, zaposleniPass=:pass WHERE zaposleniID=:id";
$stmt= $conn->prepare($sql);
if ($stmt->execute($data)){
    echo "Zaposleni številka " . $id . " je posodobljen.";
};

?>