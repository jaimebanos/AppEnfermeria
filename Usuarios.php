<?php
include "Conexion\\ConexionSingle.php";
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
    public function login($check){

        #CONEXION SINGLE
        $conexion = ConexionSingle::getInstancia();

        #BUSCA EN LA BASE DE DATOS EL DNI INTRUCIDO Y COMPRUEBA SI LAS PASSWORD COINCIDE
        try {
            $sql = "select * from usuarios where dni = '$this->dni'";
            $sth = $conexion->prepare($sql);
            $sth->execute();
        }catch (Exception $e){
            Throw($e);
        }

        $registro = $sth->fetch(PDO::FETCH_ASSOC);

        if($registro['pass']== sha1($this->pass)) {
            #Si el check está marcado crearemos el token y lo añadiremos a las cookies de nuetro navegador
            if($check=='true'){
            // TODO pendiente hacer token
            /* Pasos a seguir:
                1.Una vez que sabemos que la cuenta introducida es correcta,
                Accederemos al dni, de la cuenta y el nombre, y crearemos el token que se
                almacenará en un campo de ese cliente hasheado y con el nombre de token
                2.Con ese mismo valor del token crearemos una cookie, donde irá guardado,
                con una duración de 1 dia.
                3.Si el usuario al día siguiente intenta entrar automaticamente y le vuelve a pedir
                la contraseña porque el token ha caducado, el token que había se borrará de la base de datos
                y no se creará uno hasta que el usuario vuelva a marcar la casilla.
            */

                $this->crear_token($this->dni, $this->pass);
            }
            return $registro;
        }
    }

    /**
     * La creación de token a partir de dni, pass,
     * @param $dni
     * @param $pass
     * @return void
     */
    private function crear_token($dni,$pass){
        $token =  sha1($dni.$pass);
        setcookie("password",$token,time()+3600);
    }

}