<?php

#ISSETS DE LOS $_POST
include "Alumnos.php";
$accion = isset($_POST['accion'])?$_POST['accion']:"";
$login = isset($_POST['datos'])?$_POST['datos']:[];


#LO QUE CONTENDRÁ EL JSON
$data = "";
$msg = "";
$succes = true;


try {
    switch ($accion) {
        case "listUser":
            include "auth_inc.php";
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