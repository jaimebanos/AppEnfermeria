<?php

#ISSETS DE LOS $_POST
include "Alumnos.php";
$accion = isset($_POST['accion'])?$_POST['accion']:"";

#LO QUE CONTENDRÁ EL JSON
$data = "";
$msg = "";
$succes = true;


try {
    switch ($accion) {
        case "listUser":

            #Obtenemos el array
            $data = Alumnos::list_user();

            break;

    }
    #Todas las excepciones que se ejecuten en Alumnos.sphp o Conexion single, serán lanzadas a esta clase
}catch (Exception $e){
    $succes = false;
    $msg = $e;
    $data = null;
}

#JSON QUE DEVOLVER
echo json_encode(array("data" => $data, "msg" => $msg, "success" => $succes));