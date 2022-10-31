<?php

#ISSETS DE LOS $_POST
include_once "Pacientes.php";
$accion = isset($_POST['accion'])?$_POST['accion']:"";
$dni_eliminar = isset($_POST['id_eliminar'])?$_POST['id_eliminar']:"";



#LO QUE CONTENDRÁ EL JSON
$data = "";
$msg = "";
$succes = true;


try {
    switch ($accion) {
        case "listUser":
            include_once "auth_inc.php";
            #Obtenemos el array
            $data = Pacientes::list_user();
            break;
        case "eliminar_paciente":
            include_once "auth_inc.php";
            #Obtenemos el array
            $data = Pacientes::delete_user($dni_eliminar);



    }
    #Todas las excepciones que se ejecuten en Pacientes.php o Conexion single, serán lanzadas a esta clase
}catch (Exception $e){
    $succes = false;
    $msg = $e;
    $data = null;
}

#JSON QUE DEVOLVER
echo json_encode(array("data" => $data, "msg" => $msg, "success" => $succes));