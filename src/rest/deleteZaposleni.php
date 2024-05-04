<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$id = $_POST['id'];

try {
$sql = "UPDATE `zaposlen` SET `deleted` = 1 WHERE `zaposleniID` = :zaposleniID AND `deleted` = 0";
$stmt= $conn->prepare($sql);
if ($stmt->execute(['zaposleniID' => $id])){
    echo "Zaposleni številka " . $id . " je izbrisan.";
}
} catch (Exception $e) {
    $conn->rollBack();
    echo "Napaka pri brisanju: " . $e->getMessage();
}
