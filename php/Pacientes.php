<?php
include_once "..\\Conexion\\ConexionSingle.php";

class Pacientes
{
    public $nombre;
    public $dni;
    public $observaciones;
    public $apellidos;
    public $telefono;
    public $fecha_nacimiento;
    public $usuario_asignado;
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
     * @param $fecha_nacimiento
     * @param $usuario_asignado
     * @param $genero
     */
    public function __construct($nombre, $dni, $observaciones, $apellidos, $telefono, $fecha_nacimiento, $usuario_asignado, $genero)
    {
        $this->nombre = $nombre;
        $this->dni = $dni;
        $this->observaciones = $observaciones;
        $this->apellidos = $apellidos;
        $this->telefono = $telefono;
        $this->fecha_nacimiento = $fecha_nacimiento;
        $this->usuario_asignado = $usuario_asignado;
        $this->genero = $genero;
    }

    public static function delete_user($telefono)
    {

        $pdo = ConexionSingle::getInstancia();
        try {
            $sql = "UPDATE paciente set fecha_baja = now() where telefono = '$telefono'";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            return self::list_user();
        } catch (Exception $e) {
            throw $e;
        }

    }

    /**
     * Te devuelve los datos de la tabla pacientes para listarlos en la página pacientes.html
     */
    public static function list_user()
    {


        $pdo = ConexionSingle::getInstancia();
        try {
            $sql = "SELECT * , FLOOR(DATEDIFF(NOW(),fecha_nacimiento)/365) AS edad , fecha_baja FROM paciente order by fecha_baja";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            return $stmt->fetchAll();
        } catch (Exception $e) {
            throw $e;
        }

    }

    /**
     * Devuelve los datos de un paciente, con el numero parasado por parámetro
     * @param $telefono
     * @return mixed
     * @throws Exception
     */
    public static function ver_paciente($telefono)
    {


        $pdo = ConexionSingle::getInstancia();
        try {
            $sql = "select p.*, g.nombre as grupo, FLOOR(DATEDIFF(NOW(),p.fecha_nacimiento)/365) AS edad from paciente p, grupo g, tecnico t where p.telefono = '$telefono' and p.usuario_asignado = t.id_usuario and t.id_grupo = g.id  ";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $paciente = $stmt->fetch(PDO::FETCH_ASSOC);
            if (empty($paciente)) {
                $sql = "select *, FLOOR(DATEDIFF(NOW(),fecha_nacimiento)/365) AS edad from paciente where telefono = '$telefono' and usuario_asignado is null ";
                $stmt = $pdo->prepare($sql);
                $stmt->execute();
                $paciente = $stmt->fetch(PDO::FETCH_ASSOC);

                if (empty($paciente)) {
                    $sql = "select p.*, 'Sin grupo' as grupo, FLOOR(DATEDIFF(NOW(),fecha_nacimiento)/365) AS edad from paciente p, grupo g, tecnico t where p.telefono = '$telefono' and p.usuario_asignado = t.id_usuario and t.id_grupo is null";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute();
                    $paciente = $stmt->fetch(PDO::FETCH_ASSOC);


                }
            }

            return $paciente;
        } catch (Exception $e) {
            throw $e;
        }

    }


    /**
     * Cambia los valores de un usuario, por los nuevos valores asignados
     * @return bool
     * @throws Exception
     */
    public function edit_paciente()
    {


        $pdo = ConexionSingle::getInstancia();
        try {
            #Hacer un update segun se requiera
            $sql = "UPDATE paciente set dni ='$this->dni',telefono='$this->telefono',nombre='$this->nombre',
                    apellidos='$this->apellidos',usuario_asignado='$this->usuario_asignado',observaciones = '$this->observaciones',
                    fecha_nacimiento='$this->fecha_nacimiento',genero='$this->genero' where telefono = '$this->telefono'";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            return true;
        } catch (Exception $e) {
            throw $e;
        }

    }

    /**
     * Agrega un nuevo paciente, si devuelve true, es que lo ha agregado con exito
     * @throws Exception
     */
    public function agregar_paciente()
    {
        $pdo = ConexionSingle::getInstancia();
        if (!empty($this->telefono)) {
            try {
                if (empty($this->usuario_asignado)) {
                    $sql = "insert into paciente (dni,telefono,nombre,apellidos,usuario_asignado,observaciones,fecha_nacimiento,genero)
                    values ('$this->dni','$this->telefono','$this->nombre','$this->apellidos',null,'$this->observaciones','$this->fecha_nacimiento','$this->genero')";
                } else {
                    $sql = "insert into paciente (dni,telefono,nombre,apellidos,usuario_asignado,observaciones,fecha_nacimiento,genero)
                    values ('$this->dni','$this->telefono','$this->nombre','$this->apellidos','$this->usuario_asignado','$this->observaciones','$this->fecha_nacimiento','$this->genero')";
                }
                $stmt = $pdo->prepare($sql);
                $stmt->execute();
                return true;
            } catch (Exception $e) {
                throw $e;
            }
        }
    }


}