<?php 
include_once 'auth.php';
include_once 'db.php';

$_POST = json_decode(file_get_contents("php://input"), true);
$userID = $_POST['dropValue'];

$sql = "SELECT skupinaIme FROM skupine WHERE skupinaID = '$userID'";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->fetch();
echo json_encode(["skupinaIme" => $result["skupinaIme"]]);

$stmt = null;
$conn = null;
?>