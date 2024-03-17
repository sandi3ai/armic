<?php

include_once '../rest/db.php';

function markEmailAsSent($userID) {
    global $conn;
    try {
        $sql = "UPDATE zaposlen SET emailZaUrePoslan = 1 WHERE zaposleniID = :userID";

        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);

        $stmt->execute();

        echo "emailZaUrePoslan set to 1 for userID: " . $userID . "\n;";
    } catch (PDOException $e) {
        echo "Server error: " . $e->getMessage();
    }
}
