<?php

#ISSETS DE LOS $_POST
include_once "Pacientes.php";

#ACCION QUE SE REALIZA
$accion = isset($_POST['accion'])?$_POST['accion']:"";
$login = isset($_POST['datos'])?$_POST['datos']:[];

#DNI A ELIMINAR
$telefono = isset($_POST['telefono'])?$_POST['telefono']:"";

#Datos para agregar el paciente
$datos_paciente = isset($_POST['datos_paciente'])?$_POST['datos_paciente']:[];




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
        case "dar_baja":
            include_once "auth_inc.php";
            #Obtenemos el array
            $data = Pacientes::delete_user($telefono);
            break;
        case "ver_paciente":
            include_once "auth_inc.php";
            #Obtenemos el array
            $data = Pacientes::ver_paciente($telefono);
            break;
        case "edit_paciente":
            include_once "auth_inc.php";
            #Creamos un  objeto paciente, con los datos obtenidos
            $paciente = new Pacientes($datos_paciente['nombre'],$datos_paciente['dni'],$datos_paciente['observaciones'],$datos_paciente['apellido'],
            $datos_paciente['telefono'],$datos_paciente['fecha_nacimiento'],$datos_paciente['usuario_asignado'],$datos_paciente['genero']);

            #Llamaremos al metodo editar paciente, y le cambiará los datos de ese paciente, a los que le pasaremos
            #Si devuelve true, ha ido bien
            $resultado=$paciente->edit_paciente();

            if($resultado===true){
                $msg = "Updateado con exito";
            }else{
                $msg = "Fallo al actualizar el usuario";
                $succes = false;
            }

            break;
        case "agregar_paciente":
            include_once "auth_inc.php";

            #COMPROBAREMOS SI LE HEMOS PASADO ALGÚN DATO PARA CREAR PACIENTES
            if(!empty($datos_paciente)){

                #CREAREMOS UN PACIENTE CON LOS PARAMETROS RECIBIDOS
                $paciente = new Pacientes($datos_paciente['nombre'],$datos_paciente['dni'],$datos_paciente['observaciones'],$datos_paciente['apellido'],
                $datos_paciente['telefono'],$datos_paciente['fecha_nacimiento'],$datos_paciente['usuario_asignado'],$datos_paciente['genero']);

                #LLAMAMOS AL METODO AGREGAR_PACIENTE Y SI NO FALLA LA CONSULTA, SE CREARÁ UN PACIENTE CON LOS DATOS PASADOS
                $resultado=$paciente->agregar_paciente();
                if($resultado === true){
                    $msg = "agregado con exito";
                }else{
                    $msg = $resultado;
                }
            }else{
                $msg= "No has insertado nada";
            }
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