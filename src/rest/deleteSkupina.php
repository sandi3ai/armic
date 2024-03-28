<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$id = $_POST['id'];

$sql = "UPDATE `skupine` SET `deleted` = 1 WHERE `skupinaID` = :skupinaID AND `deleted` = 0";
$stmt = $conn->prepare($sql);
if ($stmt->execute(['skupinaID' => $id])){
    echo "Dežurni številka " . htmlspecialchars($id) . " je izbrisan.";
}
