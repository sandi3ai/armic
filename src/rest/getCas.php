<?php 
include_once 'auth.php';
include_once 'db.php';

$_POST = json_decode(file_get_contents("php://input"), true);

$userID = $_POST['dropValue'];
$startDate = $_POST['startDate'];
$endDate = $_POST['endDate'];

$sql = "SELECT * FROM `cas` WHERE userID='$userID' AND datum >=  '$startDate' AND datum <= '$endDate' ORDER BY `datum` ASC";
$stmt = $conn->prepare($sql);
$stmt->execute();

$fetch= array('cas' => []);
//fetch je array ki ima ključ cas, in je prazen array

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $fetch['cas'][] = $row;
}
echo json_encode($fetch);

$stmt = null;
$conn = null;
?>