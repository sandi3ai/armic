<?php 
include_once 'auth.php';
include_once 'db.php';

$sql = "SELECT DISTINCT YEAR(datumZ) AS year FROM odsotnost
UNION
SELECT DISTINCT YEAR(datumK) FROM odsotnost
ORDER BY year ASC";

$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$years = [];

foreach ($result as $row) {
    $years[] = $row['year'];
}
echo json_encode(["letaVBazi" => $years]);

$stmt = null;
$conn = null;
