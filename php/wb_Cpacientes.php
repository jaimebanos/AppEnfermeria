<?php

#ISSETS DE LOS $_POST
include_once "Pacientes.php";
$accion = isset($_POST['accion'])?$_POST['accion']:"";
$dni_eliminar = isset($_POST['id_eliminar'])?$_POST['id_eliminar']:"";
$dni_ver = isset($_POST['id_ver'])?$_POST['id_ver']:"";
$dni_editar = isset($_POST['id_editar'])?$_POST['id_editar']:"";



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
            break;
        case "ver_paciente":
            include_once "auth_inc.php";
            #Obtenemos el array
            $data = Pacientes::ver_user($dni_ver);
            break;
        case "editar_paciente":
            include_once "auth_inc.php";
            #Obtenemos el array
            $data = Pacientes::edit_user($dni_editar);
            break;



    }
    #Todas las excepciones que se ejecuten en Pacientes.php o Conexion single, serán lanzadas a esta clase
}catch (Exception $e){
    $succes = false;
    $msg = $e;
    $data = null;
}

#JSON QUE DEVOLVER
echo json_encode(array("data" => $data, "msg" => $msg, "success" => $succes));