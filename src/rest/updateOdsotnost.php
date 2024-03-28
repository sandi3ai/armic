<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$dopustID = $_POST['passedID'] ?? null; // Using null coalescing operator
$status = $_POST['status'] ?? null;
// If we're updating vacation days (not sick leaves) we need to get the new value and update the user's vacation totals
$newVacationValue = $_POST['newVacationValue'] ?? null;
$odsotenUserID = $_POST['odsotenUserID'] ?? null;

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
    $sql = "UPDATE `odsotnost` SET status=:status
    WHERE dopustID=:dopustID AND `deleted` = 0";
    $stmt = $conn->prepare($sql);
    $stmt->execute($data);

    // Check if there's a need to update the zaposlen table
    if ($newVacationValue !== null && $odsotenUserID !== null) {
        // Fetch the tip of odsotnost to determine if it's "Dopust"
        $tipSql = "SELECT tip FROM odsotnost WHERE dopustID=:dopustID AND `deleted` = 0";
        $tipStmt = $conn->prepare($tipSql);
        $tipStmt->execute(['dopustID' => $dopustID]);
        $tipResult = $tipStmt->fetch(PDO::FETCH_ASSOC);

        // If the odsotnost is of type "Dopust", update the zaposlen table
        if ($tipResult['tip'] === 'Dopust') {
            $updateZaposlenSql = "UPDATE `zaposlen` SET preostanekDopusta=:newVacationValue
            WHERE zaposleniID=:odsotenUserID AND `deleted` = 0";
            $updateZaposlenStmt = $conn->prepare($updateZaposlenSql);
            $updateZaposlenStmt->execute([
                'newVacationValue' => $newVacationValue,
                'odsotenUserID' => $odsotenUserID
            ]);
            echo " and preostanekDopusta updated for zaposleniID " . $odsotenUserID;
        }
    }

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
$tipStmt = null;
$updateZaposlenStmt = null;
$conn = null;
