<?php

#ISSETS DE LOS $_POST
include_once "Usuarios.php";
$accion = isset($_POST['accion'])?$_POST['accion']:"";
$login = isset($_POST['datos'])?$_POST['datos']:[];
$token = isset($_POST['token'])?$_POST['token']:null;

#LO QUE CONTENDRÁ EL JSON
$data = "";
$msg = "";
$succes = true;


try {
    switch ($accion) {
        case "login":
            if(!empty($login)) {

                //Se crea un usuario, para poder llamar luego a login y comprobar su datos
                $user = new Usuarios($login['dni'], $login['pass']);

                /*Llama a la funcion Login esta devuelve un array con los datos del usuario
                Si este existe y la contraseña y dni introducido son correctos*/

                $data= $user->login();

                if (empty($data)) {
                    $msg = "DNI o password incorrecta";
                    $succes = false;
                }
            }else{
                $succes = false;
            }
            break;
        case "comprobar_login":
            include "auth_inc.php";
            break;
        case "MostrarInfo":
            #Identifica y obtiene los datos necesarios para el perfil
            include "auth_inc.php";
            $data = Usuarios::mostrarInfo($token);
            break;
        case "cerrar_sesion":
            #Borra el token de la base de datos, del token pasado
            Usuarios::cerrar_sesion($token);

    }
    #Todas las excepciones que se ejecuten en Usuarios.php o Conexion single, serán lanzadas a esta clase
}catch (Exception $e){
    $succes = false;
    $msg = $e;
    $data = null;
}

#JSON QUE DEVOLVER
echo json_encode(array("data" => $data, "msg" => $msg, "success" => $succes));