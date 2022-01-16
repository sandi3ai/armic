<?php
include_once('db.php');
// insert a single publisher
$name = "Test";
$date = 15/01/2022;
 
$sql = "INSERT INTO dezurstva (dezurniDatum, dezurniIzvajalec) VALUES (:date, :name)";
$stmt= $pdo->prepare($sql);
$stmt->execute($data);
 
 
// Here we create a variable that calls the prepare() method of the database object
// The SQL query you want to run is entered as the parameter, and placeholders are written like this :placeholder_name
$my_Insert_Statement = $my_Db_Connection->prepare("INSERT INTO dezurstva (dezurniDatum, dezurniIzvajalec) VALUES (:date, :name)");
// Now we tell the script which variable each placeholder actually refers to using the bindParam() method
// First parameter is the placeholder in the statement above - the second parameter is a variable that it should refer to
$my_Insert_Statement->bindParam(':name', $name);
$my_Insert_Statement->bindParam(':date', $date);
// Execute the query using the data we just defined
// The execute() method returns TRUE if it is successful and FALSE if it is not, allowing you to write your own messages here
if ($my_Insert_Statement->execute()) {
  echo "New record created successfully";
} else {
  echo "Unable to create record";
}
 
?>