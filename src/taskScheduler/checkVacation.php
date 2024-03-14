<?php

include_once '../rest/db.php';

function isOnVacation($userID, DateTime $today) {
    global $conn; // Assuming $conn is a PDO instance
    $todayFormatted = $today->format('Y-m-d');

    $sql = "SELECT COUNT(*) FROM odsotnost 
            WHERE odsotenUserID = :userID 
            AND datumZ <= :todayFormatted 
            AND datumK >= :todayFormatted";

    $stmt = $conn->prepare($sql);
    
    // Bind the parameters using PDO
    $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
    $stmt->bindParam(':todayFormatted', $todayFormatted, PDO::PARAM_STR);
    $stmt->bindParam(':todayFormatted', $todayFormatted, PDO::PARAM_STR);

    $stmt->execute();

    // Fetch the count. If the count is more than 0, the user is on vacation.
    echo "stmt->fetchColumn(): " . $stmt->fetchColumn() . "\n";
    return $stmt->fetchColumn() > 0;
}
