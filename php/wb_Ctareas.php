<?php

#Incluye la clase de la  que obtiene la información

include_once "Tareas.php";

#ACCION QUE SE REALIZA
$accion = isset($_POST['accion']) ? $_POST['accion'] : "";
$login = isset($_POST['datos']) ? $_POST['datos'] : [];
$datos_tarea = isset($_POST['datos_tarea'])?$_POST['datos_tarea']:[];



#LO QUE CONTENDRÁ EL JSON
$data = "";
$msg = "";
$succes = true;


try {
    switch ($accion) {
        case "":
            include_once "auth_inc.php";
            #Obtenemos el array
            $data = Tareas::ver_evento();
            break;

        case "agregar_evento":
            include_once "auth_inc.php";
            #Obtenemos el array
            if (!empty($datos_tarea)) {

                $tarea = new Tareas($datos_tarea['tipo_evento'], $datos_tarea['observaciones'] , $datos_tarea['pacientes_tarea'], $datos_tarea['fecha_evento'], $datos_tarea['usuario_tarea'] );

                    $resultado = $tarea->agregar_tarea();
                if ($resultado === true) {
                    $msg = "Tarea agregada con exito";
                } else {
                    $msg = $resultado;
                }
            } else {
                $msg = "No has insertado nada";
            }
            break;


    }
    #Todas las excepciones que se ejecuten en Pacientes.php o Conexion single, serán lanzadas a esta clase
} catch (Exception $e) {
    $succes = false;
    $msg = $e;
    $data = null;
}

#JSON QUE DEVOLVER
echo json_encode(array("data" => $data, "msg" => $msg, "success" => $succes));

