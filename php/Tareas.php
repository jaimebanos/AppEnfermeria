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
     * @param $id_pacientes
     * @param $fecha_evento
     * @param $id_usuario
     */
    public function __construct($tipo_evento, $id_pacientes, $fecha_evento, $id_usuario)
    {
        $this->tipo_evento = $tipo_evento;
        $this->id_pacientes = $id_pacientes;
        $this->fecha_evento = $fecha_evento;
        $this->id_usuario = $id_usuario;
    }


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



}