<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);
$casIDs = $_POST['casIDs'];

if (!empty($casIDs)) {
    $in  = str_repeat('?,', count($casIDs) - 1) . '?';
    $sql = "UPDATE cas SET deleted = 1 WHERE casID IN ($in)";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute($casIDs)) {
        echo json_encode(['success' => true, 'message' => 'Cases deleted successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete cases.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No IDs provided.']);
}
