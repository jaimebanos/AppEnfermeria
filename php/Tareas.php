<?php
include_once "..\\Conexion\\ConexionSingle.php";

class Tareas
{
    public $tipo_evento;
    public $observaciones;
    public $id_pacientes;
    public $fecha_evento;
    public $id_usuario;

    /**
     * @param $tipo_evento
     * @param $observaciones
     * @param $id_pacientes
     * @param $fecha_evento
     * @param $id_usuario
     */

    public function __construct($tipo_evento, $observaciones, $id_pacientes, $fecha_evento, $id_usuario)
    {
        $this->tipo_evento = $tipo_evento;
        $this->observaciones = $observaciones;
        $this->id_pacientes = $id_pacientes;
        $this->fecha_evento = $fecha_evento;
        $this->id_usuario = $id_usuario;
    }

    /**
     * @param $tipo_evento
     * @param $id_pacientes
     * @param $fecha_evento
     * @param $id_usuario
     */




    /***
     * Te devuelve en general todo lo de la tabla eventos,
     * @return mixed
     * @throws Exception
     */
    public static function ver_evento()
    {
        $pdo = ConexionSingle::getInstancia();
        try {
            $sql = "SELECT * from evento";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);



            return $data;

        } catch (Exception $e) {
            throw $e;
        }
    }


    /**
     * Agrega una nueva tarea,
     * @throws Exception
     */
    public function agregar_tarea()
    {
        $pdo = ConexionSingle::getInstancia();
            try {

                    $sql = "insert into evento (tipo_evento,observaciones,id_paciente,id_usuario,fecha_evento)
                    values ('$this->tipo_evento','$this->observaciones','$this->id_pacientes','$this->id_usuario','$this->fecha_evento')";

                $stmt = $pdo->prepare($sql);
                $stmt->execute();
                return true;
            } catch (Exception $e) {
                throw $e;
            }
        }




}