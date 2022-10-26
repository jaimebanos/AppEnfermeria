<?php

#ISSETS DE LOS $_POST
include "Usuarios.php";
$accion = isset($_POST['accion'])?$_POST['accion']:"";
$login = isset($_POST['datos'])?$_POST['datos']:[];

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

        if($login['token']!=null){
            $data = Usuarios::comprobar_token($login);

            if (empty($data)) {
                $succes = false;
            }
            break;
        }else{
            $succes = false;
        }
    }
    #Todas las excepciones que se ejecuten en Usuarios.php o Conexion single, serán lanzadas a esta clase
}catch (Exception $e){
    $succes = false;
    $msg = $e;
    $data = null;
}

#JSON QUE DEVOLVER
echo json_encode(array("data" => $data, "msg" => $msg, "success" => $succes));