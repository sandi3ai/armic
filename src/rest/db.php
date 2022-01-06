<?php

    session_start();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "armic";

    header("HTTP/1.1 200 OK");
    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Headers: GET,PUT,POST,DELETE,PATCH,OPTIONS,CONTENT-TYPE");
    header("Access-Control-Allow-Credentials: true");    
    header("Access-Control-Request-Headers: GET,PUT,POST,DELETE,PATCH,OPTIONS,CONTENT-TYPE");    

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

?>