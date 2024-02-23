<?php 
include_once 'auth.php';
include_once 'db.php';

$_POST = json_decode(file_get_contents("php://input"), true);
$groupID = $_POST['radioValue'];

$sql = "SELECT zaposlen.zaposleniIme, zaposlen.zaposleniID, odsotnost.datumZ, odsotnost.datumK,
odsotnost.trajanje, odsotnost.tip, odsotnost.status
FROM zaposlen LEFT JOIN odsotnost ON odsotnost.odsotenUserID = zaposlen.zaposleniID 
WHERE zaposlen.zaposleniSkupinaID = '$groupID' AND odsotnost.deleted = 0 
ORDER BY odsotnost.datumZ DESC";
$stmt = $conn->prepare($sql);
$stmt->execute();

$fetch = array('dopustnik' => []);
//fetch je array ki ima ključ dopustnik in je prazen array

while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $fetch['dopustnik'][] = $row;
}
echo json_encode($fetch);

$stmt = null;
$conn = null;