<?php 
include_once 'auth.php';
include_once 'db.php';

$_POST = json_decode(file_get_contents("php://input"), true);

$userID = $_POST['dropValue'];
$startDate = $_POST['startDate'];
$endDate = $_POST['endDate'];

// I needed to add one day to $endDate to include the whole day
$sql = "SELECT cas.*, malice.malicaZacetek, malice.malicaKonec FROM `cas`
LEFT JOIN `malice` ON cas.casID = malice.casID
WHERE cas.userID = :userID 
AND (
    cas.casZacetek >= :startDate 
    AND (
        cas.casKonec < DATE_ADD(:endDate, INTERVAL 1 DAY)
        OR (cas.casKonec IS NULL AND cas.casZacetek < DATE_ADD(:endDate, INTERVAL 1 DAY))
    )
)
ORDER BY cas.casZacetek ASC";


/**
 * The SQL query filters records based on the provided date range:
 * 1. cas.casZacetek BETWEEN :startDate AND DATE_ADD(:endDate, INTERVAL 1 DAY)
 *    - Ensures that records starting within the selected range are included.
 * 2. cas.casKonec BETWEEN :startDate AND DATE_ADD(:endDate, INTERVAL 1 DAY)
 *    - Ensures that records ending within the selected range are included, even if they started before the range.
 * 3. (cas.casKonec IS NULL AND cas.casZacetek <= DATE_ADD(:endDate, INTERVAL 1 DAY))
 *    - Ensures that records with no end date (casKonec is null) that started at any time up to and including the end date of the selected range are included.
 *    - This captures the "V teku" records that are still ongoing.
 */



$stmt = $conn->prepare($sql);
$stmt->execute([
    'userID' => $userID,
    'startDate' => $startDate,
    'endDate' => $endDate
]);

$fetch= array('cas' => []);
//fetch je array ki ima ključ cas, in je prazen array

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $fetch['cas'][] = $row;
}
echo json_encode($fetch);

$stmt = null;
$conn = null;
?>