<?php 
include_once 'auth.php';
include_once 'db.php';

$sql = "SELECT * FROM skupine WHERE `deleted` = 0 ORDER BY skupinaIme ASC";
$stmt = $conn->prepare($sql);
$stmt->execute();

$fetch= array('skupine' => []);
//fetch je array ki ima ključ dezurstva, in je prazen array

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $fetch['skupine'][] = $row;
}
echo json_encode($fetch);

$stmt = null;
$conn = null;
?>