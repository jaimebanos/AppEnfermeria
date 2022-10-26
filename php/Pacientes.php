<?php

class Pacientes
{
    public $nombre;
    public $apellido;
    public $dni;
    public $informacion;

    /**
     * @param $nombre
     * @param $apellido
     * @param $dni
     * @param $informacion
     */
    public function __construct($nombre, $apellido, $dni, $informacion)
    {
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->dni = $dni;
        $this->informacion = $informacion;
    }




}