<?php 
include_once 'auth.php';
include_once 'db.php';

// Query to get the count of "Pregled" entities from the "odsotnost" table
$sqlOdsotnost = "SELECT COUNT(*) FROM odsotnost WHERE status = 'Pregled' AND deleted = 0";
$stmtOdsotnost = $conn->prepare($sqlOdsotnost);
$stmtOdsotnost->execute();
$countOdsotnost = $stmtOdsotnost->fetchColumn();

// Query to get the count of "Pregled" entities from the "cas" table
$sqlCas = "SELECT COUNT(*) FROM cas WHERE status = 'Pregled' AND deleted = 0";
$stmtCas = $conn->prepare($sqlCas);
$stmtCas->execute();
$countNadure = $stmtCas->fetchColumn();

// Preparing the response array with both counts
$response = array(
    'countOdsotnost' => $countOdsotnost,
    'countNadure' => $countNadure
);

echo json_encode($response);

// Close the database connection
$stmtOdsotnost = null;
$stmtCas = null;
$conn = null;

