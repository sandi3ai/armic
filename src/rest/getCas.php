<?php 
include_once 'auth.php';
include_once 'db.php';

$_POST = json_decode(file_get_contents("php://input"), true);

$userID = $_POST['dropValue'];
$startDate = $_POST['startDate'];
$endDate = $_POST['endDate'];

// I needed to add one day to $endDate to include the whole day
$sql = "SELECT * FROM `cas` WHERE userID='$userID'
AND casZacetek >= '$startDate' AND (casKonec < DATE_ADD('$endDate', INTERVAL 1 DAY)
OR (casKonec IS NULL AND casZacetek < DATE_ADD('$endDate', INTERVAL 1 DAY)))
ORDER BY `casZacetek` ASC";

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