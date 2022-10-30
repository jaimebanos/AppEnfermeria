<?php
include_once "..\\Conexion\\ConexionSingle.php";

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
    public function login()
    {

        #CONEXION SINGLE
        $conexion = ConexionSingle::getInstancia();
        $token = null;
        #BUSCA EN LA BASE DE DATOS EL DNI INTRUCIDO Y COMPRUEBA SI LAS PASSWORD COINCIDE
        try {
            $sql = "select * from usuario where dni = '$this->dni'";
            $sth = $conexion->prepare($sql);
            $sth->execute();
            $registro = $sth->fetch(PDO::FETCH_ASSOC);
            if ($registro != false) {
                if ($registro['contrasenya'] == sha1($this->contrasenya)) {
                    $existe = self::token_exist($this->dni);
                    if (!$existe) {
                        $token = $this->crear_token($this->dni, $this->contrasenya);
                        $datos_devolver = array('token' => $token);
                        return $datos_devolver;
                    } else {
                        return $existe;
                    }
                }
            }
        } catch (Exception $e) {
            throw($e);
        }


    }

    /**
     * La creación de token a partir de dni, pass,
     * @param $dni
     * @param $contrasenya
     * @return void
     */
    private function crear_token($dni, $contrasenya)
    {

        //CREAER EL TOKEN CON DNI Y PASSWORD DEL USUARIO
        $options = [
            'cost' => 11
        ];
        $token = password_hash($dni . $contrasenya, PASSWORD_BCRYPT, $options);


        $conexion = ConexionSingle::getInstancia();
        try {
            $sql = "UPDATE usuario set token = '$token' where dni = '$dni'";
            $sth = $conexion->prepare($sql);
            $sth->execute();
        } catch (Exception $e) {
            throw $e;
        }

        return $token;
    }

    /**
     * Te devuelve el dni y el nombre del token pasado por parametro, si no tienes token, se te devolverá al login..
     */
    public static function comprobar_token($var_token)
    {
        $conexion = ConexionSingle::getInstancia();
        $token = $var_token;
        try {
            $sql = "select * from usuario where token = '$token'";
            $sth = $conexion->prepare($sql);
            $sth->execute();
            $campo_token = $sth->fetch(PDO::FETCH_ASSOC);
            if ($campo_token != false) {
                if ($token == $campo_token['token']) {
                    return true;
                }
            }
        } catch (Exception $e) {
            throw $e;
        }

    }

    /***
     * Comprueba si el usuario con el dni pasado tiene token o no en la base de datos.
     * @param $dni
     * @return false|mixed
     * @throws Exception
     */
    public static function token_exist($dni)
    {
        $conexion = ConexionSingle::getInstancia();
        try {
            $sql = "select token from usuario where dni = '$dni'";
            $sth = $conexion->prepare($sql);
            $sth->execute();
            $token = $sth->fetch(PDO::FETCH_ASSOC);
            if ($token['token'] == "") {
                return false;
            } else {
                return $token;
            }
        } catch (Exception $e) {
            throw $e;
        }

    }

    /***
     * Te devuelve todos los parámetros del usuario, con el token recibido por parámetro
     * @param $token
     * @return mixed
     * @throws Exception
     */
    public static function mostrarInfo($token)
    {
        $pdo = ConexionSingle::getInstancia();
        try {
            $sql = "SELECT a.*, FLOOR(DATEDIFF(NOW(),Fecha_nacimiento)/365) AS edad from admin a, usuario u where u.token ='$token' and u.dni = a.id_usuario";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($data)) {
                $sql = "SELECT a.*, FLOOR(DATEDIFF(NOW(),Fecha_nacimiento)/365) AS edad from profesor a, usuario u where u.token ='$token' and u.dni = a.id_usuario";
                $stmt = $pdo->prepare($sql);
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (empty($data)) {
                    $sql = "SELECT a.*, FLOOR(DATEDIFF(NOW(),Fecha_nacimiento)/365) AS edad from alumno a, usuario u where u.token ='$token' and u.dni = a.id_usuario";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute();
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

                }
            }


            return $data;

        } catch (Exception $e) {
            throw $e;
        }
    }

    /**
     * deja el token vación del usuario con el token pasa, usado para cerrar Sesion
     * @param $token
     * @return bool
     * @throws Exception
     */
    public static function cerrar_sesion($token){
        $pdo = ConexionSingle::getInstancia();
        try {
            $sql = "update usuario set token = '' where token = '$token'";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            return true;
        } catch (Exception $e) {
            throw $e;
        }
    }

}