<?php

#ISSETS DE LOS $_POST
include_once "Pacientes.php";

#ACCION QUE SE REALIZA
$accion = isset($_POST['accion'])?$_POST['accion']:"";
<<<<<<< Updated upstream

#DNI A ELIMINAR
$dni_eliminar = isset($_POST['id_eliminar'])?$_POST['id_eliminar']:"";

#DNI MOSTRAR
$dni_ver = isset($_POST['id_ver'])?$_POST['id_ver']:"";

#DNI PARA EDITAR
$dni_editar = isset($_POST['id_editar'])?$_POST['id_editar']:"";

$datos_paciente = isset($_POST['datos_paciente'])?$_POST['datos_paciente']:[];

=======
$login = isset($_POST['datos'])?$_POST['datos']:[];
>>>>>>> Stashed changes


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
        case "agregar_paciente":
            include_once "auth_inc.php";

            if(!empty($datos_paciente)){
                $paciente = new Pacientes($datos_paciente['nombre'],$datos_paciente['dni'],$datos_paciente['observaciones'],$datos_paciente['apellido'],
                $datos_paciente['telefono'],$datos_paciente['fecha_nacimiento'],$datos_paciente['usuario_dni'],$datos_paciente['genero']);
                $resultado=$paciente->agregar_paciente();

                if($resultado === true){
                    $msg = "Insertado con exito";
                }
            }else{
                $msg= "No has introducido nada";
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