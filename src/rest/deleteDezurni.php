<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$id = $_POST['id'];

$sql = "UPDATE `dezurstva` SET `deleted` = 1 WHERE `dezurniID` = :dezurniID AND `deleted` = 0";
$stmt= $conn->prepare($sql);
if ($stmt->execute(['dezurniID' => $id])){
    echo "Dežurni številka " . $id . " je izbrisan.";
}
