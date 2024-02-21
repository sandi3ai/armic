<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$skupinaID = $_POST['skupinaID'] ?? null; // Using null coalescing operator
$skupinaIme = $_POST['skupinaIme'] ?? null; 

if (!$skupinaID) {
    http_response_code(400);
    echo "Napaka: ID skupine ni podan ali je prazen.";
    exit;
}

if (!$skupinaIme) {
    http_response_code(400);
    echo "Napaka: Ime skupine ni podano ali je prazno.";
    exit;
}

try {
    $data = [
        'skupinaID' => $skupinaID,
        'skupinaIme' => $skupinaIme,
    ];
    $sql = "UPDATE `skupine` SET skupinaIme=:skupinaIme WHERE skupinaID=:skupinaID";
    $stmt = $conn->prepare($sql);
    $stmt->execute($data);

    if ($stmt->rowCount() > 0) {
        echo "Skupina številka " . $skupinaID . " je spremenila ime na " . $skupinaIme;
    } else {
        echo "Ni zapisov za posodobitev za skupino: " . $skupinaID;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo "Server error: " . $e->getMessage();
}

$stmt = null;
$conn = null;
?>
