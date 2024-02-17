<?php 
include_once 'auth.php';
include_once 'db.php';
$_POST = json_decode(file_get_contents("php://input"), true);

// Prepare a SELECT statement with JOIN to include zaposleniIme and calculate duration
$sql = "SELECT cas.*, zaposlen.zaposleniIme, 
        TIMESTAMPDIFF(MINUTE, cas.casZacetek, cas.casKonec) AS durationMinutes
        FROM cas 
        JOIN zaposlen ON cas.userID = zaposlen.zaposleniID
        WHERE cas.status = :status
        ORDER BY cas.casZacetek DESC";

$stmt = $conn->prepare($sql);

// Bind the "V pregledu" status to the :status parameter
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