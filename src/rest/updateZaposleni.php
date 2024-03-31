<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$id = $_POST['id'] ?? null; // Assuming 'id' will always be provided for an update operation.
$fieldsToUpdate = [];
$valuesToUpdate = ['id' => $id]; // Initialize with 'id' for the WHERE clause.

// This will only update the fields that are provided in the request; other fields will remain unchanged.
if (isset($_POST['updatedName'])) {
    $fieldsToUpdate['zaposleniIme'] = $_POST['updatedName'];
}

if (isset($_POST['updatedSkupina'])) {
    $fieldsToUpdate['zaposleniSkupinaID'] = $_POST['updatedSkupina'];
}

if (isset($_POST['updatedPass']) && !empty($_POST['updatedPass'])) {
    $fieldsToUpdate['zaposleniPass'] = hash("sha256", $_POST['updatedPass']);
}

if (isset($_POST['updatedEmail'])) {
    $fieldsToUpdate['email'] = $_POST['updatedEmail'];
}

if (isset($_POST['updatedDopust'])) {
    $fieldsToUpdate['preostanekDopusta'] = $_POST['updatedDopust'];
}

if (isset($_POST['updatedCasZacetka'])) {
    $fieldsToUpdate['predvidenZacetek'] = $_POST['updatedCasZacetka'];
}

if (count($fieldsToUpdate) > 0) {
    $updates = implode(", ", array_map(function ($field) {
        return "`$field` = :$field";
    }, array_keys($fieldsToUpdate)));
    
    $valuesToUpdate = array_merge($valuesToUpdate, $fieldsToUpdate);

    $sql = "UPDATE `zaposlen` SET $updates WHERE zaposleniID = :id AND `deleted` = 0";
    $stmt = $conn->prepare($sql);

    if ($stmt->execute($valuesToUpdate)) {
        echo "Zaposleni številka " . htmlspecialchars($id) . " je posodobljen.";
    } else {
        echo "Napaka pri posodabljanju zaposlenega številka " . htmlspecialchars($id) . ".";
    }
} else {
    echo "Ni podanih podatkov za posodobitev.";
}

$conn = null;
$stmt = null;
