<?php 
include_once 'auth.php';
include_once 'db.php';
$_POST = json_decode(file_get_contents("php://input"), true);

// Prepare a SELECT statement with JOIN to include zaposleniIme and calculate duration
$sql = "SELECT cas.*, zaposlen.zaposleniIme, 
        TIMESTAMPDIFF(MINUTE, cas.casZacetek, cas.casKonec) AS durationMinutes
        FROM cas 
        JOIN zaposlen ON cas.userID = zaposlen.zaposleniID
        WHERE cas.status = 'Pregled' AND cas.deleted = 0 AND zaposlen.deleted = 0
        ORDER BY cas.casZacetek DESC";

$stmt = $conn->prepare($sql);
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