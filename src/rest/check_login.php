<?php       //preverja na vsakem refreshu, na koga je session nastavljen
include_once 'db.php';
// Current time
echo date('h:i:s') . "\n";

// wait for 0.5 seconds
usleep(500000);

// back!
echo date('h:i:s') . "\n";


        if ($_SESSION["adminID"] > 0){
            echo json_encode(["adminID" => $_SESSION["adminID"]]);
        }
        else {
            echo json_encode(["adminID" => -1]);
        } 
        
$stmt = null;
$conn = null;//zapiranje povezave   
?>