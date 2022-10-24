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
        if($sth->fetch(PDO::FETCH_ASSOC)['pass']== $pass) {
            return "Coinciden";
        }
    }

}