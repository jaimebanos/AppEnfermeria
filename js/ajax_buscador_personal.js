$(document).ready(function () {
    $("#buscarPersonal").click(function(){
        $.ajax({
            method: "POST",
            url: "wb_Cusuarios.php",
            data: { action: "mostrarPersonal", buscar: $('#buscarPersonal').val() },
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