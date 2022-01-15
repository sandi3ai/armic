<?php 
include_once 'db.php';
$_SESSION["adminID"] = -1;
echo json_encode(["adminID" => $_SESSION["adminID"]]);
$stmt = null;
$conn = null;
?>