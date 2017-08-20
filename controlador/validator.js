function validaFormulario(rut, nombre, alias, email, web, tv, redes, amigos){

    var nick = alias.val();

    if (!checkRut(rut.val())) {

        alert('Rut Invalido');
        return false;

    }else if (nombre.val() == "") {

        alert('Nombre no puede estar en blanco');
        return false;
        
    }else if((nick.length <= 5) || (!tiene_numeros(nick)) || (!tiene_letras(nick))){
        alert('El alias debe tener mas de 5 caracteres (incluir letras y numeros).');
        return false;
    }else if(!validarEmail(email.val())){
        alert("La dirección de email es incorrecta");
        return false;
    }

    return true;

}


function tiene_numeros(texto){

    var numeros="0123456789";
   for(i=0; i<texto.length; i++){
      if (numeros.indexOf(texto.charAt(i),0)!=-1){
         return true;
      }
   }
   return false;
}

function tiene_letras(texto){

    var letras="abcdefghyjklmnñopqrstuvwxyz";
    texto = texto.toLowerCase();
    for(i=0; i<texto.length; i++){
      if (letras.indexOf(texto.charAt(i),0)!=-1){
         return true;
      }
    }
    return false;
}

function validarEmail(valor) {

    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(valor)){
        return true;
    } else {
        return false;
    }
}

function checkRut(rut) {
    // Despejar Puntos
    //var valor = rut.val().replace('.','');
    var valor = rut.split('.').join('');
    // Despejar Guión
    //valor = valor.replace('-','');
    valor = valor.split('-').join('');
    
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    
    // Formatear RUN
    rut.value = cuerpo + '-'+ dv
    
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length < 7) { 
    	return false;
    }
    
    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;
    
    // Para cada dígito del Cuerpo
    for(i=1;i<=cuerpo.length;i++) {
    
        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);
        
        // Sumar al Contador General
        suma = suma + index;
        
        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    
    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    /*
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv) { 
    	rut.setCustomValidity("RUT Inválido"); 
    	return false; }
    
    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');*/

     // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv) { 
    	//rut.setCustomValidity("RUT Inválido");
    	return false; 
    }else{
    	return true;
    }
    
    // Si todo sale bien, eliminar errores (decretar que es válido)
    //rut.setCustomValidity('');
}