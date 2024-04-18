<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$skupinaID = $_POST['skupinaID'] ?? null; // Using null coalescing operator
$skupinaIme = $_POST['skupinaIme'] ?? null;
$skupinaEmail = $_POST['skupinaEmail'] ?? null;
$vodjaID = $_POST['vodjaID'] ?? null;

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
        'skupinaEmail' => $skupinaEmail,
        'vodjaID' => $vodjaID
    ];
    $sql = "UPDATE `skupine` SET skupinaIme=:skupinaIme, vodjaEmail=:skupinaEmail, vodjaID=:vodjaID WHERE skupinaID=:skupinaID AND `deleted` = 0";
    $stmt = $conn->prepare($sql);
    $stmt->execute($data);

    if ($stmt->rowCount() > 0) {
        echo "Skupina številka " . htmlspecialchars($skupinaID) .
        " je spremenila ime na " . htmlspecialchars($skupinaIme) .
        " in email vodje na " . htmlspecialchars($skupinaEmail);
    } else {
        echo "Ni zapisov za posodobitev za skupino: " . htmlspecialchars($skupinaID);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo "Server error: " . $e->getMessage();
}

$stmt = null;
$conn = null;
?>
