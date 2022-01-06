<?php    
    include_once 'db.php';
    $_POST = json_decode(file_get_contents("php://input"), true);

    $adminEmail = $_POST["email"];//selecta z login.js
    $adminPass = hash("sha256", $_POST["password"]);//selecta z login.js

    $sql = "SELECT * FROM adminusers WHERE adminUser = ? and adminPass = ?";
    $stmt = $conn-> prepare($sql);
    $stmt->execute([$adminEmail, $adminPass]); //vrstni red v array fila vprašaje dve vrstici zgoraj

    $result = $stmt->fetch();
    if (empty($result)) {
        echo json_encode(["adminID" => -1]);
    }
    else {
        echo json_encode(["adminID" => $result[0]["adminID"]]);
        $_SESSION["adminID"] = $result[0]["adminID"];

        //session se nastavi na adminID, na vseh ostalih php fileih v sessionu pa na začetku daš
        //session_start() in pol lahko gledaš če je notri $_SESSION
        //za login nastavis $_SESSION adminID = -1
    }
?>