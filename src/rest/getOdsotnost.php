<?php 
include_once 'auth.php';
include_once 'db.php';

$_POST = json_decode(file_get_contents("php://input"), true);
$groupID = $_POST['radioValue'];
$year = $_POST['leto'];

$sql = "SELECT zaposlen.zaposleniIme, zaposlen.zaposleniID, odsotnost.datumZ, odsotnost.datumK,
odsotnost.trajanje, odsotnost.tip, odsotnost.status
FROM zaposlen
LEFT JOIN odsotnost ON odsotnost.odsotenUserID = zaposlen.zaposleniID
WHERE zaposlen.zaposleniSkupinaID = :groupID
AND zaposlen.`deleted` = 0 AND odsotnost.`deleted` = 0
AND (YEAR(odsotnost.datumZ) = :year OR YEAR(odsotnost.datumK) = :year)
ORDER BY odsotnost.datumZ ASC";

$stmt = $conn->prepare($sql);
// Execute the statement with the parameter array
$stmt->execute(['groupID' => $groupID, 'year' => $year]);

$fetch = array('dopustnik' => []);

while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $fetch['dopustnik'][] = $row;
}
echo json_encode($fetch);


$stmt = null;
$conn = null;