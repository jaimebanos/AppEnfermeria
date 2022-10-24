<?php

#ISSETS DE LOS $_POST
include "Usuarios.php";
$accion = isset($_POST['accion'])?$_POST['accion']:"";
$login = isset($_POST['datos'])?$_POST['datos']:[];

#LO QUE CONTENDRÁ EL JSON
$data = "";
$msg = "";
$succes = true;


switch ($accion){
    case "login":
        $msg = "Conectandose";
        $data = Usuarios::Login($login);
        if(empty($data)) {
            $msg = "no hay usuario con ese dni";
        }

        echo json_encode(array("data" => $data, "msg" => $msg, "success" => $succes));
}