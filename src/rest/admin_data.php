<?php    
    include_once 'db.php';
    
    checkConnection($conn);

    $sql = "SELECT * FROM adminusers";
    $result = mysqli_query($conn, $sql);
    $jsonArray = array();
    if (mysqli_num_rows($result) > 0) {             //če obstajajo vrstice
        while ($row = mysqli_fetch_assoc($result)) {    //dokler obstajajo vrstice  
            $jsonArray[] = $row;                            //jih polniš v array (vrstico po vrstico)
        }
        echo json_encode($jsonArray);
    }
    $conn->close();
?>