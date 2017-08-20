<?php
	//CLASE QUE PROVEE LA CONEXION
	class conexion
	{
		public $conexion;
		public $HostName = 'localhost';
		public $dbPort = '5432';
		public $dbName = 'electionDB';
		public $dbUser = 'postgres';
		public $dbPassword = 'aamv';

		//Propiedad estática, inicializada a nulo, donde guardaremos la instancia de la propia clase
    	static private $instance = null;

		//Definimoms el método constructor como privado
    	private function __construct()
		{
			$this->conexion = pg_connect(
				'host='.$this->HostName
				.' port='.$this->dbPort
				.' dbname='.$this->dbName
				.' user='.$this->dbUser
				.'  password='.$this->dbPassword) 
				or die('Falló al conectarse');
		}



    	//Método estatico que sirve como punto de acceso global
	    public static function getInstance() {
	        if (self::$instance == null) {
				//Si no hay instancia creada, lo hace. Si la hay tira p'alante
	            self::$instance = new conexion();
	        }
			//Al final devuelve la instancia
	        return self::$instance;
	    }
    

		//DEVUELVE LA CONEXION
		public function getConexion(){
	
			return $this->conexion;
		}

		public function __clone()
		{
		  trigger_error("No puede clonar una instancia de ". get_class($this) ." class.", E_USER_ERROR );
		}

		public function __wakeup()
		{
		  trigger_error("No puede deserializar una instancia de ". get_class($this) ." class.", E_USER_ERROR );
		}
	}

?>