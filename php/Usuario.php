<?php
include "..\\Conexion\\ConexionSingle.php";
class Usuario
{
    public $token;
    public $dni;
    public $Fecha_vencimiento;
    public $n_usuario;
    public $contrasenya;
    public $imagen_url;

    /**
     * @param $token
     * @param $dni
     * @param $Fecha_vencimiento
     * @param $n_usuario
     * @param $contrasenya
     * @param $imagen_url
     */
    public function __construct($token, $dni, $Fecha_vencimiento, $n_usuario, $contrasenya, $imagen_url)
    {
        $this->token = $token;
        $this->dni = $dni;
        $this->Fecha_vencimiento = $Fecha_vencimiento;
        $this->n_usuario = $n_usuario;
        $this->contrasenya = $contrasenya;
        $this->imagen_url = $imagen_url;
    }


    /**
     *Recibe el dni y la password, y comprueba si esta es correcta, y si está
     * en la base de datos, si es así devolverá un array con sus parametros
     * @return mixed|void
     * @throws Exception
     */
    public static function listUsers(){

        #CONEXION SINGLE
        $conexion = ConexionSingle::getInstancia();
        #BUSCA EN LA BASE DE DATOS EL DNI INTRUCIDO Y COMPRUEBA SI LAS PASSWORD COINCIDE
        try {
            $sql = "select * from usuario";
            $sth = $conexion->prepare($sql);
            $sth->execute();
            $data = $sth->fetchAll();
            return $data;
        }catch (Exception $e){
            Throw($e);
        }


    }






}