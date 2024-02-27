<?php 
include_once 'auth.php';
include_once 'db.php';
$_POST = json_decode(file_get_contents("php://input"), true);


// Define an array of statuses to include in the query
$statuses = ["Pregled", "Zavrnjeno"];

// Create a string of placeholders for the IN clause
// E.g., if $statuses has 2 items, $placeholders will be ":status0,:status1"
$placeholders = implode(',', array_map(function($key) { return ":status$key"; }, array_keys($statuses)));

// Prepare a SELECT statement with JOIN to include zaposleniIme
// Select * from odsotnost and join with zaposlen to get zaposleniIme
$sql = "SELECT odsotnost.*, zaposlen.zaposleniIme, zaposlen.preostanekDopusta
        FROM odsotnost
        JOIN zaposlen ON odsotnost.odsotenUserID = zaposlen.zaposleniID
        WHERE odsotnost.status IN ($placeholders)
        AND odsotnost.deleted = 0
        ORDER BY odsotnost.datumZ DESC";

$stmt = $conn->prepare($sql);


// Bind each status to the corresponding placeholder
foreach ($statuses as $key => $status) {
    $stmt->bindValue(":status$key", $status);
}

// Execute the statement
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Check if results were found
if ($results) {
    echo json_encode($results);
} else {
    echo json_encode(['message' => 'No records found with status "Pregled" or "Zavrnjeno".']);
}

$stmt = null;
$conn = null;