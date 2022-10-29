<?php
include "..\\Conexion\\ConexionSingle.php";
class Administradores
{
    public $nombre;
    public $email;
    public $apellidos;
    public $telefono;
    public $Fecha_nacimiento;
    public $id_usuario;
    public $genero;

    /**
     * @param $nombre
     * @param $email
     * @param $apellidos
     * @param $telefono
     * @param $Fecha_nacimiento
     * @param $id_usuario
     * @param $genero
     * @param $contrasenya
     */
    public function __construct($nombre, $email, $apellidos, $telefono, $Fecha_nacimiento, $id_usuario, $genero)
    {
        $this->nombre = $nombre;
        $this->email = $email;
        $this->apellidos = $apellidos;
        $this->telefono = $telefono;
        $this->Fecha_nacimiento = $Fecha_nacimiento;
        $this->id_usuario = $id_usuario;
        $this->genero = $genero;
    }


    /**
     * Te devuelve los datos de la tabla administradores para listarlos en la páhina personal.html
     */
    public  static function list_user(){


        $pdo = ConexionSingle::getInstancia();
        try {
            $sql = "SELECT * FROM admin";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll();

            return $data;
        }catch (Exception $e){
            Throw $e;
        }

    }



}