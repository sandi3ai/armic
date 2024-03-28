<?php
include_once 'db.php';
include_once 'auth.php';
$_POST = json_decode(file_get_contents("php://input"), true);

$id = $_POST['id'] ?? null; // 'id' will always be provided for an update operation
$fieldsToUpdate = [];
$valuesToUpdate = [];

//This will only update the fields that are provided in the request, other fields will remain unchanged
if (isset($_POST['updatedName'])) {
    $fieldsToUpdate[] = "zaposleniIme=:name";
    $valuesToUpdate['name'] = $_POST['updatedName'];
}

if (isset($_POST['updatedSkupina'])) {
    $fieldsToUpdate[] = "zaposleniSkupinaID=:skupina";
    $valuesToUpdate['skupina'] = $_POST['updatedSkupina'];
}

if (isset($_POST['updatedPass']) && !empty($_POST['updatedPass'])) {
    $fieldsToUpdate[] = "zaposleniPass=:pass";
    $valuesToUpdate['pass'] = hash("sha256", $_POST['updatedPass']);
}

if (isset($_POST['updatedEmail'])) {
    $fieldsToUpdate[] = "email=:email";
    $valuesToUpdate['email'] = $_POST['updatedEmail'];
}

if (isset($_POST['updatedDopust'])) {
    $fieldsToUpdate[] = "preostanekDopusta=:dopust";
    $valuesToUpdate['dopust'] = $_POST['updatedDopust'];
}

if (isset($_POST['updatedCasZacetka'])) {
    $fieldsToUpdate[] = "predvidenZacetek=:casZacetka";
    $valuesToUpdate['casZacetka'] = $_POST['updatedCasZacetka'];
}

if (count($fieldsToUpdate) > 0) {
    $updates = [];
    $valuesToUpdate = ['id' => $id]; // Initialize with 'id' for WHERE clause

    foreach ($fieldsToUpdate as $field => $value) {
        // Directly use field names and placeholders
        $updates[] = "`$field` = :$field";
        $valuesToUpdate[$field] = $value; // Bind value to placeholder
    }

    $sql = "UPDATE `zaposlen` SET " . implode(", ", $updates) . " 
        WHERE zaposleniID = :id AND `deleted` = 0";
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

