<?php
include_once "..\\Conexion\\ConexionSingle.php";

class Usuarios
{
    public $email;
    public $contrasenya;

    /**
     * Constructor para generar un usuario
     * @param $email
     * @param $contrasenya
     */

    public function __construct($email, $contrasenya)
    {
        $this->email = $email;
        $this->contrasenya = $contrasenya;
    }

    /**
     *Recibe el email y la password, y comprueba si esta es correcta, y si está
     * en la base de datos, si es así devolverá un array con sus parametros
     * @return mixed|void
     * @throws Exception
     */
    public function login()
    {

        #CONEXION SINGLE
        $conexion = ConexionSingle::getInstancia();

        $token = null;

        #BUSCA EN LA BASE DE DATOS EL email INTRUCIDO Y COMPRUEBA SI LAS PASSWORD COINCIDE
        try {
            $sql = "select * from usuario where email = '$this->email'";
            $sth = $conexion->prepare($sql);
            $sth->execute();
            $registro = $sth->fetch(PDO::FETCH_ASSOC);
            if ($registro != false) {
                if ($registro['contrasenya'] == sha1($this->contrasenya)) {
                    $existe = self::token_exist($this->email);
                    if (!$existe) {
                        $token = $this->crear_token($this->email, $this->contrasenya);
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
     * La creación de token a partir de email, pass y fecha actual,
     * Crea un token con los parametros dichos, y una fecha de vencimiento de 15 dias a partir de la actual
     * Y te devuelve el token
     * @param $email
     * @param $contrasenya
     * @return false|string|void
     */
    private function crear_token($email, $contrasenya)
    {
        $conexion = ConexionSingle::getInstancia();
        //CREAER EL TOKEN CON email Y PASSWORD DEL USUARIO
        $options = [
            'cost' => 11
        ];

        $sql = "select now() as fecha_actual";
        $sth = $conexion->prepare($sql);
        $sth->execute();
        $fecha_actual = $sth->fetch(PDO::FETCH_ASSOC);
        $token = password_hash($email.$contrasenya.$fecha_actual['fecha_actual'], PASSWORD_BCRYPT, $options);

        try {
            //AÑADIR EL TOKEN A LA TABLA DEL USUARIO
            $sql = "UPDATE usuario set token = '$token' where email = '$email'";
            $sth = $conexion->prepare($sql);
            $sth->execute();

            //AÑADIR LA FECHA DE CADUCIDAD PARA EL TOKEN
            $sql = "UPDATE usuario set Fecha_vencimiento_token = date_add(now(),INTERVAL 15 day) where email = '$email'";
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


    public static function obtener_grupo()
    {
        $conexion = ConexionSingle::getInstancia();
        try {
            $sql = "select * from grupo" ;
            $sth = $conexion->prepare($sql);
            $sth->execute();
            $data = $sth->fetchAll(PDO::FETCH_ASSOC);

            return $data;
        } catch (Exception $e) {
            return false;
            throw $e;
        }

    }

    /***
     * Comprueba si el usuario con el email pasado tiene token o no en la base de datos.
     * @param $email
     * @return false|mixed
     * @throws Exception
     */
    public static function token_exist($email)
    {
        $conexion = ConexionSingle::getInstancia();
        try {
            $sql = "select token from usuario where email = '$email'";
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
            $sql = "SELECT a.*, FLOOR(DATEDIFF(NOW(),a.fecha_nacimiento)/365) AS edad , ifnull((select count(*) from paciente where usuario_asignado=u.email and fecha_baja is null),0) AS pacientes_asignados from profesor a, usuario u where u.token ='$token' and u.email = a.id_usuario";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($data)) {
                $sql = "SELECT a.*, g.nombre as nombre_grupo ,FLOOR(DATEDIFF(NOW(),a.fecha_nacimiento)/365) AS  edad , ifnull((select count(*) from paciente where usuario_asignado=u.email and fecha_baja is null),0) AS pacientes_asignados from tecnico a, usuario u, grupo g where g.id = a.id_grupo and u.token ='$token' and u.email = a.id_usuario";
                $stmt = $pdo->prepare($sql);
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if(empty($data)){
                    $sql = "SELECT a.* , FLOOR(DATEDIFF(NOW(),a.fecha_nacimiento)/365) AS edad , ifnull((select count(*) from paciente where usuario_asignado=u.email and fecha_baja is null),0) AS pacientes_asignados from tecnico a, usuario u where  u.token ='$token' and u.email = a.id_usuario";
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




    public static function dar_baja_usuario($id){
        $pdo = ConexionSingle::getInstancia();
        try {
            $sql = "update usuario SET baja_usuario = CONCAT(DATE(NOW()),' ',TIME(NOW()))  where email = '$id'";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            return true;
        } catch (Exception $e) {
            throw $e;
        }
    }


    public  static function list_user(){


        $pdo = ConexionSingle::getInstancia();
        try {
            $sql = "SELECT t.* ,  ('Tecnico')  as rol, u.baja_usuario as inactivo, u.admnistrador as admin, g.nombre as grupo FROM usuario u, tecnico t, grupo g where  u.email = t.id_usuario and  g.id = t.id_grupo";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll();

                $sql = "SELECT p.*, ('Profesor')  as rol , u.baja_usuario as inactivo, u.admnistrador as admin, ('Varios') as grupo from profesor p, usuario u where  u.email = p.id_usuario";
                $stmt = $pdo->prepare($sql);
                $stmt->execute();
                $data2 = $stmt->fetchAll(PDO::FETCH_ASSOC) ;

            $sql = "SELECT t.* ,  ('Tecnico')  as rol, u.baja_usuario as inactivo, u.admnistrador as admin, null as grupo FROM usuario u, tecnico t where  u.email = t.id_usuario ";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $data3 = $stmt->fetchAll();


            return $data + $data2 + $data3;
        }catch (Exception $e){
            Throw $e;
        }

    }

    function crerUsuario($nombre,$apellido,$fecha_nacimiento,$genero,$telefono,$grupo,$rol,$admin){

        $conexion = ConexionSingle::getInstancia();

        try {


            $sql = "INSERT INTO usuario(email,contrasenya,  admnistrador) VALUES('$this->email', sha1('$this->contrasenya') , '$admin')";
            $stmt = $conexion->prepare($sql);
            $stmt->execute();

            //SELECCIONAR CON OTRA CONSULTA EL ID DEL GRUPO PASADO POR PARAMETROS
            if($rol == "profesor"){
                $sql = "INSERT INTO profesor(id_usuario,nombre,apellidos,telefono,fecha_nacimiento,genero)
                        VALUES('$this->email','$nombre','$apellido','$telefono','$fecha_nacimiento','$genero')";
            }else{
                $sql = "INSERT INTO tecnico(id_usuario,nombre,apellidos,telefono,fecha_nacimiento,genero, id_grupo)
                        VALUES('$this->email','$nombre','$apellido','$telefono','$fecha_nacimiento','$genero', '$grupo');";
            }
            $stmt = $conexion->prepare($sql);
            $stmt->execute();




            return true;

        }catch (Exception $E){
            $sql = "ROLLBACK";
            $stmt = $conexion->prepare($sql);
            $stmt->execute();
        }
    }

}