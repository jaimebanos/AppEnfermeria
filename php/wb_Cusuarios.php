<?php

#ISSETS DE LOS $_POST
include_once "Usuarios.php";
$accion = isset($_POST['accion'])?$_POST['accion']:"";
$login = isset($_POST['datos'])?$_POST['datos']:[];
$token = isset($_POST['token'])?$_POST['token']:null;
$crear_usuario = isset($_POST['datos_usuario'])?$_POST['datos_usuario']:[];

#LO QUE CONTENDRÁ EL JSON
$data = "";
$msg = "";
$succes = true;


try {
    switch ($accion) {
        case "login":
            if(!empty($login)) {

                //Se crea un usuario, para poder llamar luego a login y comprobar su datos
                $user = new Usuarios($login['email'], $login['pass']);

                /*Llama a la funcion Login esta devuelve un array con los datos del usuario
                Si este existe y la contraseña y dni introducido son correctos*/

                $data= $user->login();

                if (empty($data)) {
                    $msg = "correo o password incorrecta";
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
            break;
        case "listUser":
            include "auth_inc.php";
            #Obtenemos el array
            $data = Usuarios::list_user();

            break;
        case "agregar_usuario":
            if(!empty($crear_usuario)) {

                $user = new Usuarios($crear_usuario['email'], $crear_usuario['contrasenya']);

                $resultado = $user->crerUsuario($crear_usuario['nombre'], $crear_usuario['apellido'], $crear_usuario['fecha_nacimiento'],
                    $crear_usuario['genero'], $crear_usuario['telefono'], $crear_usuario['grupo'], $crear_usuario['rol'], $crear_usuario['admin'], $crear_usuario['activo']);



                $data = $resultado;

                if ($resultado === true) {
                    $msg = "Insertado con exito";
                } else {
                    $msg = "No se ha introducido nada";
                }
                break;

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