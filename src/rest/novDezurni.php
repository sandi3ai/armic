<?php
include_once 'db.php';

$date = $_POST['date'];
$name = $_POST['name'];
  if (empty($name)) {
    echo "Name is empty";
  } else {
    echo $name;
  }
  
$sql = "INSERT INTO dezurstva (dezurniDatum, dezurniIzvajalec) VALUES (:date, :name)";
$stmt= $conn->prepare($sql);
$stmt->execute(['date' => $date, 'name' => $name]);
?>