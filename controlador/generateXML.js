var texto = [];

function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
}

//Genera un objeto Blob con los datos en un archivo XML
function generarXml(jsonContent, rut) {
    //jsonContent tiene los datos de la lista
    //si el rut es distinto de 0 genera el xml solo el votante seleccionado
    
    
    texto.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
    //SI RUT ES 0 GENERA TODOS LOS VOTANTES DE LA LISTA
    if (rut == 0){
        for (i in jsonContent){
            push(jsonContent[i]);            
        }
    }else{
        for (i in jsonContent){
            if (jsonContent[i].rut == rut){
                push(jsonContent[i]);
            }
        }
    }    
    //No olvidemos especificar el tipo MIME correcto :)
    return new Blob(texto, {
        type: 'application/xml'
    });
};

function push(datos){
        
    texto.push('<datos>\n');
    texto.push('\t<nombre>');
    texto.push(escaparXML(datos.name));
    texto.push('</nombre>\n');
    texto.push('\t<telefono>');
    texto.push(escaparXML(datos.namecandidate));
    texto.push('</telefono>\n');
    texto.push('\t<fecha>');
    texto.push(escaparXML(datos.date));
    texto.push('</fecha>\n');
    texto.push('</datos>');
}

//Función de ayuda: "escapa" las entidades XML necesarias
//para los valores (y atributos) del archivo XML
function escaparXML(cadena) {
    if (typeof cadena !== 'string') {
        return '';
    };
    cadena = cadena.replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;');
    return cadena;
}

