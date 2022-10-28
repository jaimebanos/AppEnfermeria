<?php

class ConexionSingle
{
    private static $pdo;

    /**
     * @throws Exception
     */
    private function __construct()
    {
        $servername = "localhost";
        $username = "root";
        $database = "appenfermeria";
        $pass = "";
        try {
            self::$pdo = new PDO("mysql:host=$servername;dbname=$database;charset=utf8", $username, $pass);

        }catch (Exception $e) {
            throw($e);
        }
    }

    /**
     * Instanciar una clase PDO, y si ya existe se devuelve la misma
     * @return PDO
     */
    public static function getInstancia(){
        if(!self::$pdo instanceof PDO){
            new self();
        }
        return self::$pdo;
    }
}