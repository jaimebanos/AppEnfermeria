<?php
include "..\\Conexion\\ConexionSingle.php";
class Pacientes
{
    public $nombre;
    public $dni;
    public $localidad;
    public $observaciones;
    public $patologias;
    public $apellidos;
    public $telefono;
    public $Fecha_nacimiento;
    public $id_usuario;
    public $genero;


    /**
     * @param $nombre
     * @param $dni
     * @param $localidad
     * @param $observaciones
     * @param $patologias
     * @param $email
     * @param $apellidos
     * @param $telefono
     * @param $Fecha_nacimiento
     * @param $id_usuario
     * @param $genero
     */
    public function __construct($nombre, $dni, $localidad, $observaciones, $patologias, $apellidos, $telefono, $Fecha_nacimiento, $id_usuario, $genero)
    {
        $this->nombre = $nombre;
        $this->dni = $dni;
        $this->localidad = $localidad;
        $this->observaciones = $observaciones;
        $this->patologias = $patologias;
        $this->apellidos = $apellidos;
        $this->telefono = $telefono;
        $this->Fecha_nacimiento = $Fecha_nacimiento;
        $this->id_usuario = $id_usuario;
        $this->genero = $genero;
    }


    /**
     * Te devuelve los datos de la tabla pacientes para listarlos en la página pacientes.html
     */
    public  static function list_user(){


        $pdo = ConexionSingle::getInstancia();
        try {
            $sql = "SELECT * FROM paciente";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            return $stmt->fetchAll();
        }catch (Exception $e){
            Throw $e;
        }

    }



}