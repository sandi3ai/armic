<?php    
    //preverja na vsakem refreshu, na koga je session nastavljen
    include_once 'db.php';
        if ($_SESSION["adminID"] > 0){
            echo json_encode(["adminID" => $_SESSION["adminID"]]);
        }
        else {
            echo json_encode(["adminID" => -1]);
        }    
?>