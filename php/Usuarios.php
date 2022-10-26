<?php
include "..\\Conexion\\ConexionSingle.php";
class Usuarios
{
    public $nombre;
    public $dni;
    public $pass;

    /**
     * Constructor para generar un usuario
     * @param $dni
     * @param $pass
     */

    public function __construct($dni,$pass)
    {
            $this->dni = $dni;
            $this->pass = $pass;
    }

    /**
     *Recibe el dni y la password, y comprueba si esta es correcta, y si está
     * en la base de datos, si es así devolverá un array con sus parametros
     * @return mixed|void
     * @throws Exception
     */
    public function login(){

        #CONEXION SINGLE
        $conexion = ConexionSingle::getInstancia();
        $token=null;
        #BUSCA EN LA BASE DE DATOS EL DNI INTRUCIDO Y COMPRUEBA SI LAS PASSWORD COINCIDE
        try {
            $sql = "select * from usuarios where dni = '$this->dni'";
            $sth = $conexion->prepare($sql);
            $sth->execute();
            $registro = $sth->fetch(PDO::FETCH_ASSOC);
            if($registro != false){
                if($registro['pass']== sha1($this->pass)) {
                    
                    $token = $this->crear_token($this->dni,$this->pass);
                    $datos_devolver = array('token'=>$token);
                    return $datos_devolver;
                }
            }
        }catch (Exception $e){
            Throw($e);
        }


    }

    /**
     * La creación de token a partir de dni, pass,
     * @param $dni
     * @param $pass
     * @return void
     */
    private function crear_token($dni,$pass){

        //CREAER EL TOKEN CON DNI Y PASSWORD DEL USUARIO
        $options = [
            'cost' => 11
        ];
        $token = password_hash($dni.$pass,PASSWORD_BCRYPT,$options);


        $conexion = ConexionSingle::getInstancia();
        try {
            $sql = "UPDATE usuarios set token = '$token' where dni = '$dni'";
            $sth = $conexion->prepare($sql);
            $sth->execute();
        }catch (Exception $e){
            Throw $e;
        }

        return $token;
    }


}