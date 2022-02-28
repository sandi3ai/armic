<?php 
include_once 'auth.php';
include_once 'db.php';

$sql = "SELECT * FROM zaposlen ORDER BY zaposleniIme ASC";
$stmt = $conn->prepare($sql);
$stmt->execute();

$fetch=array();

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $fetch['zaposleni'][] = $row;
}
echo json_encode($fetch);

$stmt = null;
$conn = null;
?>