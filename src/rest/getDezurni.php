<?php 
include_once('db.php');

$sql = "SELECT * FROM dezurstva";
$stmt = $conn->prepare($sql);
$stmt->execute();
while($dezurstva = $stmt->fetch()) {
    echo json_encode($dezurstva);
}
$stmt = null;
$conn = null;
?>