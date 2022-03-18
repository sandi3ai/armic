<?php
include_once 'db.php';

if (!isset($_SESSION["adminID"]) || $_SESSION["adminID"] < 1){
    echo "Not logged in";
    exit;
}
?>