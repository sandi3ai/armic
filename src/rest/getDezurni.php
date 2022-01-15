<?php 
include_once('db.php');

$sql = "SELECT * FROM dezurstva";
$stmt = $conn->prepare($sql);
$stmt->execute();
while($dezurstva = $stmt->fetch()) {
    print_r($dezurstva);
}
$stmt = null;
$conn = null;
?>