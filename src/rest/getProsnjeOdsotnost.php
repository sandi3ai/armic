<?php 
include_once 'auth.php';
include_once 'db.php';
$_POST = json_decode(file_get_contents("php://input"), true);

// Prepare a SELECT statement with JOIN to include zaposleniIme
// Select * from odsotnost and join with zaposlen to get zaposleniIme
$sql = "SELECT odsotnost.*, zaposlen.zaposleniIme
        FROM odsotnost
        JOIN zaposlen ON odsotnost.odsotenUserID = zaposlen.zaposleniID
        WHERE odsotnost.status = :status
        AND odsotnost.deleted = 0
        ORDER BY odsotnost.datumZ DESC";

$stmt = $conn->prepare($sql);

// Bind the "Pregled" status to the :status parameter
$status = "Pregled";
$stmt->bindParam(':status', $status);

// Execute the statement
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Check if results were found
if ($results) {
    echo json_encode($results);
} else {
    echo json_encode(['message' => 'No records found with status "Pregled".']);
}

$stmt = null;
$conn = null;
?>