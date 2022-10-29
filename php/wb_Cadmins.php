<?php

#ISSETS DE LOS $_POST
include "Administradores.php";
$accion = isset($_POST['accion'])?$_POST['accion']:"";

#LO QUE CONTENDRÁ EL JSON
$data = "";
$msg = "";
$succes = true;


try {
    switch ($accion) {
        case "listUser":

            #Obtenemos el array
            $data = Administradores::list_user();

            break;

    }
    #Todas las excepciones que se ejecuten en Administradores.php o Conexion single, serán lanzadas a esta clase
}catch (Exception $e){
    $succes = false;
    $msg = $e;
    $data = null;
}

#JSON QUE DEVOLVER
echo json_encode(array("data" => $data, "msg" => $msg, "success" => $succes));