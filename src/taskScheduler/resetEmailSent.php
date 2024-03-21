<?php

include_once __DIR__ . '/../rest/db.php';
$logFile = "C:\\xampp\\htdocs\\reactProjects\\armic\\src\\taskScheduler\\emailResetLog.txt";
    $currentDateTime = date('Y-m-d H:i:s');

try {
    $sql = "UPDATE zaposlen SET emailZaUrePoslan = 0";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    echo "All emailZaUrePoslan flags have been reset to 0\n";
    file_put_contents($logFile, "All emailZaUrePoslan flags have been reset to 0 at {$currentDateTime}\n", FILE_APPEND);
} catch (PDOException $e) {
    echo "Server error: " . $e->getMessage();
    file_put_contents($logFile, "Error at {$currentDateTime}: " . $e->getMessage() . "\n", FILE_APPEND);
}

