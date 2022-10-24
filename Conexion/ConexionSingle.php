<?php

class ConexionSingle
{
    private static $pdo;

    private function __construct()
    {
        $servername = "localhost";
        $username = "root";
        $database = "enfermeria";
        $pass = "";

        self::$pdo = new PDO("mysql:host=$servername;dbname=$database;charset=utf8", $username, $pass);
    }

    public static function getInstancia(){
        if(!self::$pdo instanceof PDO){
            new self();
        }
        return self::$pdo;
    }
}