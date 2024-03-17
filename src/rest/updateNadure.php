<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$casID = $_POST['passedID'] ?? null; // Using null coalescing operator
$status = $_POST['status'] ?? null; 

if (!$casID) {
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
        'casID' => $casID,
        'status' => $status,
    ];
    $sql = "UPDATE `cas` SET status=:status WHERE casID=:casID";
    $stmt = $conn->prepare($sql);
    $stmt->execute($data);

    if ($stmt->rowCount() > 0) {
        echo "Čas številka " . $casID . " je spremenil status na " . $status;
    } else {
        echo "Ni zapisov za posodobitev za casID " . $casID;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo "Server error: " . $e->getMessage();
}
