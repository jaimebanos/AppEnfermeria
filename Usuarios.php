<?php

class Usuarios
{
    public $nombre;
    public $dni;
    public $pass;

    public function __construct($nombre,$dni,$pass)
    {

    }

    public static function Login($datos){
        include "Conexion\\ConexionSingle.php";
        #Si nuestro checked está vacio parasá a ser un false
        $checked = isset($datos['check'])?$datos['check']:'false';

        #HACE REFERENCIA A LOS DATOS INTRUDUCIDEOS EN LOS INPUTS(DNI Y PASSWORD)
        $dni = $datos['dni'];
        $pass = $datos['pass'];

        #CONEXION SINGLE
        $conexion = ConexionSingle::getInstancia();

        #BUSCA EN LA BASE DE DATOS EL DNI INTRUCIDO Y COMPRUEBA SI LAS PASSWORD COINCIDE
        $sql = "select pass from usuarios where dni = '$dni'";
        $sth = $conexion->prepare($sql);
        $sth->execute();

        #SI COINCIDE DEVUELVE TRUE, SI NO DEVOLVERÁ UN FALSE
        if($sth->fetch(PDO::FETCH_ASSOC)['pass']== sha1($pass)) {
            #Si el check está marcado crearemos el token y lo añadiremos a las cookies de nuetro navegador
            if($checked=='true'){

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

            }
            return "Coinciden";
        }
    }

}