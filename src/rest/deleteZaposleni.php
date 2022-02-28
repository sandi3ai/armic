<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$id = $_POST['id'];

$sql = "DELETE FROM `zaposlen` WHERE `zaposlen`.`zaposleniID` =" . $id;
$stmt= $conn->prepare($sql);
if ($stmt->execute()){
    echo "Zaposleni številka " . $id . " je izbrisan.";
}

?>