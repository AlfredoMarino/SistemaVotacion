<?php 
	include 'conection.php';

	//INSTANCIO LA CONEXION
	$con = conexion::getInstance();
	$dbConection = $con->getConexion();
	
	$opcion = $_GET['qry'];

	switch ($opcion) {

		//COMBO region
		case 1:
			$consulta = "SELECT * FROM regions";
		break;

		//COMBO communes DEPENDE DEL regions
		case 2:
			$consulta = "SELECT * FROM communes;";
		break;

		//COMBO communes DEPENDE DEL regions
		case 3:
			$consulta = "SELECT * FROM candidates;";
		break;
            
                //COMBO communes DEPENDE DEL regions
		case 4:
                    $rut = $_GET['rut'];
                    $consulta = "SELECT * FROM voters where rut = ".$rut.";";
		break;
                
                //Totalizador
                case 5:
                    $consulta = "SELECT * FROM totalizador;";        
                break;
            
                //Lista de votos
                case 6:
                    $consulta = "SELECT * FROM voters a, candidates b where a.id_candidate = b.id_candidate;";        
                break;
	}

	//EJECUTA CONSULTA
	$resultado = pg_query($dbConection,$consulta);

	//DEVUELVE CONSULTA COMO JSON
	$resultArray = pg_fetch_all($resultado);
	echo json_encode($resultArray);

	//CIERRA LA CONEXION
	pg_close($dbConection);
?>