$(document).ready(function () {
    $("#buscarPaciente").click(function(){
        $.ajax({
            method: "POST",
            url: "wb_Cpacientes.php",
            data: { action: "mostrarPacientes", buscar: $('#buscarPaciente').val() },
            dataType : "json"
        })
            .done(function( response ) {
                console.log(response);
                if (response.success) {
                    console.log("response success");
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) { /*fallo del servidor*/
                console.log(errorThrown);
            });

    })

});