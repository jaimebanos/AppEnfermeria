<?php

    $token = isset($_POST['token'])?$_POST['token']:null;

    if(!$token == null){
        //TODO hacer referencia a una función de Usuarios que comprueba si ese token que recibe existe, o se ha caducado
        // si no existe, se devuelve un echo con succes false y se le dirige al login
        if (!Usuarios::comprobar_token($token)) {
            echo json_encode(array("data" => "", "msg" => "login", "success" => false));
            exit();
        }
    }else{
        //Si token es null, te devuelve al login
        echo json_encode(array("data"=>"","msg"=>"login","success"=>false));
        exit();
}