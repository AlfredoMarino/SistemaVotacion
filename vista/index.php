<html>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="../controlador/controller.js"></script>

	<head>
		<title>Centro de votación</title>

		<style type="text/css">
	 
			input{
				margin: 0;
			}
			 
			label{
				display: inline-block;
				width: 178px;
				margin-right: 15px;
			}
			input[type="text"]{
				margin-bottom: 5px;
			}

			select{
				width: 173px;
				margin-bottom: 5px;
			}
			
		</style>


	</head>
	<body>


	<table border="1">
		<tr>
			<td>
				<h3 align="CENTER">FORMULARIO DE VOTACION</h3>
				
				<form id="formulario" method="POST">
					<label>Nombre y apellido</label>
					<input type="text" name="name" id="name" value="Rodrigo"><br>

					<label>Alias</label>
					<input type="text" name="nickname" id="nickname" value="roro"><br>

					<label>RUT</label>
					<input type="text" name="rut" id="rut"><br>

					<label>Email</label>
					<input type="text" name="email" id="email" value="ro@hotmail.com"><br>

					<label>Región</label>
					<select name="region" id="region">
					</select><br>

					<label>Comuna</label>
					<select name="commune" id="commune">
					</select><br>

					<label>Candidato</label>
					<select name="candidate" id="candidate">
					</select><br>

					<label>Como se enteró de nosotros</label>
					<input type="checkbox" name="web" id="web" value="false">Web
					<input type="checkbox" name="tv" id="tv" value="false">TV
					<input type="checkbox" name="socialnetwork" id="socialnetwork" value="false">Redes Sociales
					<input type="checkbox" name="friend" id="friend" value="false">Amigo


					<br>
					<br>

					<input type="button" name="button" id="button" value="Votar">
				</form>
			</td>
			<td>
				<h3 align="CENTER">FORMULARIO DE TOTALES</h3>
                                <ul>
                                    
                                    <li type="disc">Totalizado de votos por candidato</li>
                                    <table id="tableTotalizacion" border="1">
                                        
                                    </table>
                                </ul>
			</td>

		</tr>
		<tr>
			<td colspan="2">
				<h3 align="CENTER">LISTADO DE VOTOS EMITIDOS</h3>
                                <ul id="listVotos">
                                    
                                    
                                </ul>
			</td>
			
		</tr>


	</table>



	</body>
</html>