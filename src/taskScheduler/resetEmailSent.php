<?php

include_once '../rest/db.php';

try {
    $sql = "UPDATE zaposlen SET emailZaUrePoslan = 0";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    echo "All emailZaUrePoslan flags have been reset to 0\n";
} catch (PDOException $e) {
    echo "Server error: " . $e->getMessage();
}

