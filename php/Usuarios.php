<?php
include "..\\Conexion\\ConexionSingle.php";
class Usuarios
{
    public $nombre;
    public $dni;
    public $contrasenya;

    /**
     * Constructor para generar un usuario
     * @param $dni
     * @param $contrasenya
     */

    public function __construct($dni, $contrasenya)
    {
            $this->dni = $dni;
            $this->contrasenya = $contrasenya;
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
            $sql = "select * from usuario where dni = '$this->dni'";
            $sth = $conexion->prepare($sql);
            $sth->execute();
            $registro = $sth->fetch(PDO::FETCH_ASSOC);
            if($registro != false){
                if($registro['contrasenya']== sha1($this->contrasenya)) {
                    $existe = self::token_exist($this->dni);
                    if(!$existe){
                        $token = $this->crear_token($this->dni,$this->contrasenya);
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
     * @param $contrasenya
     * @return void
     */
    private function crear_token($dni,$contrasenya){

        //CREAER EL TOKEN CON DNI Y PASSWORD DEL USUARIO
        $options = [
            'cost' => 11
        ];
        $token = password_hash($dni.$contrasenya,PASSWORD_BCRYPT,$options);


        $conexion = ConexionSingle::getInstancia();
        try {
            $sql = "UPDATE usuario set token = '$token' where dni = '$dni'";
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
        $token = $var_token;
        try {
            $sql = "select * from usuario where token = '$token'";
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
         $sql = "select token from usuario where dni = '$dni'";
         $sth = $conexion->prepare($sql);
         $sth->execute();
         $token = $sth->fetch(PDO::FETCH_ASSOC); 
         if($token['token'] == ""){
             return false;
         }else{
             return $token;    
         }
     }catch (Exception $e){
          Throw $e;
     }
        
   }



}