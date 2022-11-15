<?php

#Incluye la clase de la  que obtiene la información

include_once "Tareas.php";

#ACCION QUE SE REALIZA
$accion = isset($_POST['accion'])?$_POST['accion']:"";
$login = isset($_POST['datos'])?$_POST['datos']:[];




#LO QUE CONTENDRÁ EL JSON
$data = "";
$msg = "";
$succes = true;


try {
    switch ($accion) {
        case "ver_tipo_evento":
            include_once "auth_inc.php";
            #Obtenemos el array
            $data = Pacientes::list_user();
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


