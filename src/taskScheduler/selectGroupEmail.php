<?php
/* Deprecated, the email will not be sent to the group leader if the user is on vacation
include_once __DIR__ . '/../rest/db.php';

function selectGroupEmail($groupId, $logFileContent, $zaposleniIme) {
    global $conn;
    $sql = "SELECT vodjaEmail FROM skupine WHERE skupinaID = :skupinaID AND deleted = 0";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':skupinaID', $groupId, PDO::PARAM_INT);
    $stmt->execute();

$result = $stmt->fetch();

if ($result) {
    $logFileContent .= $zaposleniIme . " je na dopustu, email bo poslan vodji skupine: "
     . $result['vodjaEmail'] . "\n";

    return $result['vodjaEmail'];
} else {
    // Handle the case where no email was found, or the group has been deleted
    $logFileContent .= "No group leader email found for group ID: " . $groupId . "\n";
    return null;
}
}