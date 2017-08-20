<?php

	include 'conection.php';

        $messageReturn = "";
        
	//si es igual a 1 inserta, sino elimina
	$opcion = $_GET['a'];

	if ($opcion == 1) {
            
                $rut = $_POST['rut'];
                $rut = str_replace('.', "", $rut);
                $rut = str_replace('-', "", $rut);
                
		$name = $_POST['name'];
		$nickname = $_POST['nickname'];
		$email = $_POST['email'];
		$region = $_POST['region'];
		$commune = $_POST['commune'];
		$candidate = $_POST['candidate'];

		if (!isset($_POST['web'])) {
			$web = 'false';
		}else{
			$web = 'true';
		}

		if (!isset($_POST['tv'])) {
			$tv = 'false';
		}else{
			$tv = 'true';
		}

		if (!isset($_POST['socialnetwork'])) {
			$socialnetwork = 'false';
		}else{
			$socialnetwork = 'true';
		}

		if (!isset($_POST['friend'])) {
			$friend = 'false';
		}else{
			$friend = 'true';
		}

		$date = date("d/m/y");
		$time = date("h:m:s");

		//$query = "insert into voters (rut, nickname, name, email, id_region, id_commune, id_candidate, web, tv, socialnetwork, friend, date, time) values (5, 'roto1', 'alfredonsky', 'alf@hotmail.com', 1, 1, 3, true, true, true, true, '16/08/2017', '23:08:00');";

		$query = "insert into voters (rut, nickname, name, email, id_region, id_commune, id_candidate, web, tv, socialnetwork, friend, date, time) values (".$rut.", '".$nickname."', '".$name."', '".$email."', ".$region.", ".$commune.", ".$candidate.", ".$web.", ".$tv.", ".$socialnetwork.", ".$friend.", '".$date."', '".$time."');";
                
                $messageReturn = 'Realizó un voto exitosamente';
	}else{
            
            $rut = $_GET['b'];
            $rut = str_replace('.', "", $rut);
            $rut = str_replace('-', "", $rut);
            
            $query = "delete from voters where rut = ".$rut;
            $messageReturn = 'Eliminó un voto';
	}
	

	//INSTANCIO LA CONEXION
	$con = conexion::getInstance();
	$dbConection = $con->getConexion();

	//EJECUTA CONSULTA
	$resultado = @pg_query($dbConection, $query);

	if (!$resultado) {
		echo pg_last_error();
	}else{
		echo $messageReturn;
	}

?>