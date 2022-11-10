$(document).ready(function() {
    $(document).on('click', '.editar_paciente', function(){
        let id =$(this).parent().parent().children().first().text();


        console.log(id);
        var request = $.ajax({
            url: '../php/wb_Cpacientes.php',
            method: "POST",
            data: {
                "accion": "editar_paciente",
                'token': localStorage.getItem('token'),
                'id_editar': id,
            },
            dataType: "json"
        });

        request.done(function (response) {
        });

        request.done(function (response) {
            /**
             * Ir a editar perfil rellenando los campos
             */
        });

        request.fail(function (jqXHR, textStatus) {
            console.log("Error alumnos");
            alert("Request failed: " + textStatus);
        });

    })
});



