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
                    $existe = self::token_exist($this->dni);
                    if($existe == "error"){
                        $token = $this->crear_token($this->dni,$this->pass);
                        $datos_devolver = array('token'=>$token);
                        return $datos_devolver;
                    }else{
                        return $existe;
                    }
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

    /**
    * Te devuelve el dni y el nombre del token pasado por parametro, si no tienes token, se te devolverá al login..
    */
    public static function comprobar_token($var_token){
        $conexion = ConexionSingle::getInstancia();
        $token = $var_token['token'];
        try {
            $sql = "select * from usuarios where token = '$token'";
            $sth = $conexion->prepare($sql);
            $sth->execute();
            $campo_token = $sth->fetch(PDO::FETCH_ASSOC);
            if($campo_token != false){
                if ($token == $campo_token['token']){
                    return true;
                }
            }
        }catch (Exception $e){
            Throw $e;
        }

    }

    public static function token_exist($dni){
     $conexion = ConexionSingle::getInstancia();
      try {
         $sql = "select token from usuarios where dni = '$dni'";
         $sth = $conexion->prepare($sql);
         $sth->execute();
         $token = $sth->fetch(PDO::FETCH_ASSOC); 
         if($token['token'] == ""){
             return "error";
         }else{
             return $token;    
         }
     }catch (Exception $e){
          Throw $e;
     }
        
   }



}