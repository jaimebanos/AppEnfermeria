<?php

    $token = isset($_POST['token'])?$_POST['token']:null;

    if(!$token == null){
        //TODO hacer referencia a una función de Usuarios que comprueba si ese token que recibe existe, o se ha caducado
        // si no existe, se devuelve un echo con succes false y se le dirige al login
    }else{
        //TODO si está en nulo, se hará un echo con succes false y se le dirige al login
    }