<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$dopustID = $_POST['passedID'] ?? null; // Using null coalescing operator
$status = $_POST['status'] ?? null; 

if (!$dopustID) {
    http_response_code(400);
    echo "Napaka: ID časa ni podan ali je prazen.";
    exit;
}

if (!$status) {
    http_response_code(400);
    echo "Napaka: Status ni podan ali je prazen.";
    exit;
}

try {
    $data = [
        'dopustID' => $dopustID,
        'status' => $status,
    ];
    $sql = "UPDATE `odsotnost` SET status=:status WHERE dopustID=:dopustID";
    $stmt = $conn->prepare($sql);
    $stmt->execute($data);

    if ($stmt->rowCount() > 0) {
        echo "Odsotnost številka " . $dopustID . " je spremenil status na " . $status;
    } else {
        echo "Ni zapisov za posodobitev za dopustID " . $dopustID;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo "Server error: " . $e->getMessage();
}

$stmt = null;
$conn = null;
?>
