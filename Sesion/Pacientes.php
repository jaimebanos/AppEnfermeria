<?php  
	
class Pacientes
{
    public $nombre;
    public $dni;
    public $apellido;
    #CONSTRUCTOR

    public function __construct($username,$dni,$apellido){
        $this->nombre = $username;
        $this->dni = $dni;
        $this->apellido = $apellido;
    }

}