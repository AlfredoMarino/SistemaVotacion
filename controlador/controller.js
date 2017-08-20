var combos = new Object();

$(document).ready(function () {
    
    //carga combo region
    $.ajax({
        url: "../modelo/queryJson.php?qry=1",
        type: "Get",
        success: function (data) { 
            try{
                var content = JSON.parse(data);
                combos.regions = content;   

                $("#region").empty();
                $("#region").append("<option value=0></option>");
                for (var i = content.length - 1; i >= 0; i--) {
                    
                    $("#region").append("<option value=" + content[i].id_region + ">" + content[i].nameregion + "</option>");
                }
            }catch(err){
                console.log(err);
            }
            
        },
        error: function (msg) { alert(msg); }
    });
    
    //carga combo comuna
    $.ajax({
        url: "../modelo/queryJson.php?qry=2",
        type: "Get",
        success: function (data) { 
            try{
                var content = JSON.parse(data);
                combos.communes = content;   

                $("#commune").empty();
                $("#commune").append("<option value=0></option>");
                for (var i = content.length - 1; i >= 0; i--) {
                    
                    $("#commune").append("<option value=" + content[i].id_commune + ">" + content[i].namecommune + "</option>");
                }
            }catch(err){
                console.log(err);
            }
            
        },
        error: function (msg) { alert(msg); }
    });
    
    //carga combo candidatos
    $.ajax({
        url: "../modelo/queryJson.php?qry=3",
        type: "Get",
        success: function (data) { 
            try{
                var content = JSON.parse(data);
                combos.candidates = content;   
                
                $("#candidate").empty();
                $("#candidate").append("<option value=0></option>");
                for (var i = content.length - 1; i >= 0; i--) {
                    
                    $("#candidate").append("<option value=" + content[i].id_candidate + ">" + content[i].namecandidate + "</option>");
                }
            }catch(err){
                console.log(err);
            }
            
        },
        error: function (msg) { alert(msg); }
    });


    //filtra combo de comunas
    $('#region').change(function(){
        var id= $('#region').val();

        $("#commune").empty();
        $("#commune").append("<option value=0></option>");
        for (i in combos.communes) {
            if (combos.communes[i].id_region == id) {
                $("#commune").append("<option value=" + combos.communes[i].id_commune + ">" + combos.communes[i].namecommune + "</option>");
            }        
        }
    });  
    
    //CONSULTA POR RUT2
    $('#rut').blur(function(){
        rut = $('#rut').val();
    
        rut = rut.replace(/\D/g,'');

        alert(rut);
        $.ajax({
            url: "../modelo/queryJson.php?qry=4&rut="+rut,
            type: "Get",
            success: function (data) { 
                if(data != 'false'){
                    try{
                        var content = JSON.parse(data);

                        $('#name').val(content[0].name);
                        $('#nickname').val(content[0].nickname);
                        $('#email').val(content[0].email);
                        $('#region').prop('value', content[0].id_region);
                        
                        $("#commune").empty();
                        $("#commune").append("<option value=0></option>");
                        for (i in combos.communes) {
                            if (combos.communes[i].id_region == content[0].id_region) {
                                $("#commune").append("<option value=" + combos.communes[i].id_commune + ">" + combos.communes[i].namecommune + "</option>");
                            }        
                        }
                        $('#commune').prop('value', content[0].id_commune);
                        $('#candidate').prop('value', content[0].id_candidate);
                        $('#web').prop('checked', formateCheckbox(content[0].web));
                        $('#tv').prop('checked', formateCheckbox(content[0].tv));
                        $('#socialnetwork').prop('checked', formateCheckbox(content[0].socialnetwork));
                        $('#friend').prop('checked', formateCheckbox(content[0].friend));

                    }catch(err){
                        console.log(err);
                    }
                }

            },
                error: function (msg) { alert(msg); }
            });
    });

    //inserta
    $('#button').click(function(e){
        e.preventDefault();
        var rut = $('#rut');
        var name = $('#name');
        var nickname = $('#nickname');
        var email = $('#email');

        $.getScript("../controlador/validator.js", 
            function(data) {
                //if (validaFormulario(rut, name, nickname, email)) {
                  //  if (validaCombobox() && validaCheckbox()) {

                        var dataString = $('#formulario').serialize();

                        alert('Datos serializados: '+dataString);

                        $.ajax({
                            type: "POST",
                            url: "../modelo/action_model.php?a=1",
                            data: dataString,
                            success: function(data) {
                                //refreshTable();
                                alert(data);
                            }
                        });
                    //}
                //} 
            }
        );
    });

function validaCheckbox(){
    var count = 0;

    if ($('#web').prop('checked')) {
        $('#web').val('true');
        count += 1;
    }else{
        $('#web').val('false');
    }

    if ($('#tv').prop('checked')) {
        $('#tv').val('true');
        count += 1;
    }else{
        $('#tv').val('false');
    }

    if ($('#socialnetwork').prop('checked')) {
        $('#socialnetwork').val('true');
        count += 1;
    }else{
        $('#socialnetwork').val('false');
    }

    if ($('#friend').prop('checked')) {
        $('#friend').val('true');
        count += 1;
    }else{
        $('#friend').val('false');
    }

    if (count < 2) {
        alert('Debe elegir al menos dos checkbox');
        return false;
    }

    return true;
}

function validaCombobox(){
    if ($('#region').prop('value') == 0) {
        alert('Debe seleccionar una region');
        return false;
    }

    if ($('#commune').prop('value') == 0) {
        alert('Debe seleccionar una comuna');
        return false;
    }

    if ($('#candidate').prop('value') == 0) {
        alert('Debe elegir un candidato');
        return false;
    }

    return true;
}



}); 

function formateCheckbox(value){
    if(value == 't'){
        return true;
    }else{
        return false;
    }
}



