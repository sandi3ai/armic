<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$dopustID = $_POST['dopustID'] ?? null; // Using null coalescing operator

// Validate dopustID is an integer.
if (!is_numeric($dopustID) || (int)$dopustID != $dopustID) {
    http_response_code(400);
    echo "Napaka: ID časa ni pravilno podan ali je prazen.";
    exit;
}

try {
    $data = [
        'dopustID' => $dopustID,
    ];
    $sql = "UPDATE `odsotnost` SET deleted=1 WHERE dopustID=:dopustID";
    $stmt = $conn->prepare($sql);
    $stmt->execute($data);

    if ($stmt->rowCount() > 0) {
        echo "Odsotnost številka " . $dopustID . " je izbrisan";
    } else {
        echo "Ni zapisov za izbris za dopustID " . $dopustID;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo "Server error: " . $e->getMessage();
}

$stmt = null;
$conn = null;
