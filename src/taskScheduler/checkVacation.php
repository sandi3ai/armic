<?php

include_once __DIR__ . '/../rest/db.php';

function isOnVacation($userID, DateTime $today) {
    global $conn;
    $todayFormatted = $today->format('Y-m-d');

    $sql = "SELECT COUNT(*) FROM odsotnost 
            WHERE odsotenUserID = :userID 
            AND datumZ <= :todayFormatted 
            AND datumK >= :todayFormatted
            AND status = 'Odobreno'
            AND `deleted` = 0";

    $stmt = $conn->prepare($sql);
    
    // Bind the parameters using PDO
    $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
    $stmt->bindParam(':todayFormatted', $todayFormatted, PDO::PARAM_STR);

    $stmt->execute();

    // Fetch the count. If the count is more than 0, the user is on vacation.
    $count = $stmt->fetchColumn();
    return $count > 0;
}
