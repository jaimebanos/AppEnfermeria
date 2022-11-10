<?php
include_once "..\\Conexion\\ConexionSingle.php";

class Usuarios
{
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
<<<<<<< Updated upstream
        $token = null;
=======
>>>>>>> Stashed changes
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
     * La creación de token a partir de dni, pass y fecha actual,
     * Crea un token con los parametros dichos, y una fecha de vencimiento de 15 dias a partir de la actual
     * Y te devuelve el token
     * @param $dni
     * @param $contrasenya
     * @return false|string|void
     */
    private function crear_token($dni, $contrasenya)
    {
        $conexion = ConexionSingle::getInstancia();
        //CREAER EL TOKEN CON DNI Y PASSWORD DEL USUARIO
        $options = [
            'cost' => 11
        ];

        $sql = "select now() as fecha_actual";
        $sth = $conexion->prepare($sql);
        $sth->execute();
        $fecha_actual = $sth->fetch(PDO::FETCH_ASSOC);
        $token = password_hash($dni.$contrasenya.$fecha_actual['fecha_actual'], PASSWORD_BCRYPT, $options);

        try {
            //AÑADIR EL TOKEN A LA TABLA DEL USUARIO
            $sql = "UPDATE usuario set token = '$token' where dni = '$dni'";
            $sth = $conexion->prepare($sql);
            $sth->execute();

            //AÑADIR LA FECHA DE CADUCIDAD PARA EL TOKEN
            $sql = "UPDATE usuario set Fecha_vencimiento_token = date_add(now(),INTERVAL 15 day) where dni = '$dni'";
            $sth = $conexion->prepare($sql);
            $sth->execute();
        } catch (Exception $e) {
            throw $e;
        }

        return $token;
    }

    /**
     *Comprueba si el token enviado, existe, si existe, hará otra comprobación y es, si la fecha actual
     * es menor que la fecha de caducidad que tiene, en el momento que la supere, se borrará el token y la fecha y se creará una nueva
     *
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
                    //COMPROBAR QUE LA FECHA ES MENOR QUE LA ACTUAL
                    $sql = "select (now()>Fecha_vencimiento_token) as resultado from usuario where token = '$token'";
                    $sth = $conexion->prepare($sql);
                    $sth->execute();
                    $fecha = $sth->fetch(PDO::FETCH_ASSOC);
                    if($fecha['resultado'] == 0){
                        return true;
                    }else{
                        $sql = "update usuario set token = '', Fecha_vencimiento_token = null where token = '$token'";
                        $sth = $conexion->prepare($sql);
                        $sth->execute();
                    }

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
            $sql = "SELECT a.*, FLOOR(DATEDIFF(NOW(),a.fecha_nacimiento)/365) AS edad from profesor a, usuario u where u.token ='$token' and u.dni = a.id_usuario";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($data)) {
                $sql = "SELECT a.*, g.nombre as nombre_grupo ,FLOOR(DATEDIFF(NOW(),a.fecha_nacimiento)/365) AS edad from tecnico a, usuario u, grupo g where g.id = a.id_grupo and u.token ='$token' and u.dni = a.id_usuario";
                $stmt = $pdo->prepare($sql);
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if(empty($data)){
                    $sql = "SELECT a.* , FLOOR(DATEDIFF(NOW(),a.fecha_nacimiento)/365) AS edad from tecnico a, usuario u where  u.token ='$token' and u.dni = a.id_usuario";
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
            $sql = "update usuario set token = '', Fecha_vencimiento_token=null where token = '$token'";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            return true;
        } catch (Exception $e) {
            throw $e;
        }
    }

}