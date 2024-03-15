<?php

include_once '../rest/db.php';

function markEmailAsSent($userID) {
    global $conn; 
    
    $sql = "UPDATE ..."; 

    $stmt = $conn->prepare($sql);
    
    // Bind the parameters using PDO
    $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);

    $stmt->execute();

    // Fetch the count. If the count is more than 0, the user has logged hours for today.
    $count = $stmt->fetchColumn();
    return $count > 0;
}
