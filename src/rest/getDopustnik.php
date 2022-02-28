<?php 
include_once 'auth.php';
include_once 'db.php';

$_POST = json_decode(file_get_contents("php://input"), true);
$groupID = $_POST['radioValue'];

$sql = "SELECT zaposlen.zaposleniIme, zaposlen.zaposleniID, dopust.datumZ, dopust.datumK FROM zaposlen LEFT JOIN dopust ON dopust.dopustnikID = zaposlen.zaposleniID WHERE zaposlen.zaposleniSkupinaID = '$groupID' ORDER BY dopust.datumZ DESC";
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
?>