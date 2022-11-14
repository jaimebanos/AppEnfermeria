<?php

#ISSETS DE LOS $_POST
include_once "Usuarios.php";
$accion = isset($_POST['accion']) ? $_POST['accion'] : "";
$login = isset($_POST['datos']) ? $_POST['datos'] : [];
$token = isset($_POST['token']) ? $_POST['token'] : null;
$email = isset($_POST['email']) ? $_POST['email'] : null;
$datos_usuario = isset($_POST['datos_usuario']) ? $_POST['datos_usuario'] : [];

#LO QUE CONTENDRÁ EL JSON
$data = "";
$msg = "";
$succes = true;


try {
    switch ($accion) {
        case "login":
            if (!empty($login)) {

                //Se crea un usuario, para poder llamar luego a login y comprobar su datos
                $user = new Usuarios($login['email'], $login['pass']);

                /*Llama a la funcion Login esta devuelve un array con los datos del usuario
                Si este existe y la contraseña y dni introducido son correctos*/

                $data = $user->login();

                if (empty($data)) {
                    $msg = "correo o password incorrecta";
                    $succes = false;
                }
            } else {
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
        case "eliminar_usuario":
            include "auth_inc.php";
            Usuarios::dar_baja_usuario($email);
            break;
        case "obtener_grupo_select":
            include "auth_inc.php";
            $data = Usuarios::obtener_grupo();
            break;
        case "obtener_usuario_asignado_select":
            include "auth_inc.php";
            $data = Usuarios::obtener_usuario_asignado();
            break;

        case "ver_usuario":
            include "auth_inc.php";
            $data = Usuarios::ver_usuario($email);
            break;


        case "editar_usuario":
            include "auth_inc.php";

            $user = new Usuarios($datos_usuario['email'], $datos_usuario['contrasenya']);

            $resultado = $user->editar_usuario($email, $datos_usuario['nombre'], $datos_usuario['apellido'], $datos_usuario['fecha_nacimiento'],
                $datos_usuario['genero'], $datos_usuario['telefono'], $datos_usuario['grupo'], $datos_usuario['rol'], $datos_usuario['admin']);


            $data = $resultado;

            if ($resultado === true) {
                $msg = "Actualizado con exito";
            } else {
                $msg = "No se ha introducido nada";
            }

            break;

        case "agregar_usuario":
            if (!empty($datos_usuario)) {

                $user = new Usuarios($datos_usuario['email'], $datos_usuario['contrasenya']);

                $resultado = $user->crerUsuario($datos_usuario['nombre'], $datos_usuario['apellido'], $datos_usuario['fecha_nacimiento'],
                    $datos_usuario['genero'], $datos_usuario['telefono'], $datos_usuario['grupo'], $datos_usuario['rol'], $datos_usuario['admin']);


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
} catch (Exception $e) {
    $succes = false;
    $msg = $e;
    $data = null;
}

#JSON QUE DEVOLVER
echo json_encode(array("data" => $data, "msg" => $msg, "success" => $succes));