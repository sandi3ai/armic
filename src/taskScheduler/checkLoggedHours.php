<?php

include_once __DIR__ . '/../rest/db.php';


function hasLoggedHours($userID, DateTime $today) {
    global $conn; 
    $todayFormatted = $today->format('Y-m-d');
    
    $sql = "SELECT COUNT(*) FROM cas 
            WHERE userID = :userID 
            AND DATE(casZacetek) = :todayFormatted"; 

    $stmt = $conn->prepare($sql);
    
    // Bind the parameters using PDO
    $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
    $stmt->bindParam(':todayFormatted', $todayFormatted, PDO::PARAM_STR);

    $stmt->execute();

    // Fetch the count. If the count is more than 0, the user has logged hours for today.
    $count = $stmt->fetchColumn();
    return $count > 0;
}
