<?php 
include_once 'auth.php';
include_once 'db.php';

$_POST = json_decode(file_get_contents("php://input"), true);
$userID = $_POST['dropValue'];

$sql = "SELECT zaposlen.zaposleniIme FROM zaposlen LEFT JOIN cas ON cas.userID = zaposlen.zaposleniID WHERE zaposlen.zaposleniID = '$userID'";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->fetch();
echo json_encode(["zaposleniIme" => $result["zaposleniIme"]]);

$stmt = null;
$conn = null;
?>