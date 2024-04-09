<?php

include_once __DIR__ . '/../rest/db.php';


function markEmailAsSent($userID, $logFile) {
    $currentDateTime = date('Y-m-d H:i:s');

    file_put_contents($logFile, "Email sent to userID {$userID} at {$currentDateTime}: " . "\n", FILE_APPEND);

    global $conn;
    try {
        $sql = "UPDATE zaposlen SET emailZaUrePoslan = 1
        WHERE zaposleniID = :userID AND `deleted` = 0";

        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);

        $stmt->execute();

        echo "emailZaUrePoslan set to 1 for userID: " . $userID . "\n*";
    } catch (PDOException $e) {
        echo "Server error: " . $e->getMessage();
    }
}
