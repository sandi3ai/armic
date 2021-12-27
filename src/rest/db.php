<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "armic";

    header("HTTP/1.1 200 OK");
    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    function checkConnection($conn) {
        if ($conn->connect_error) {
            die ("Connection failed: " . $conn->connect_error);
            echo "Error";
        }
    }
?>