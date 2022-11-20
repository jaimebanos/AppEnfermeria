$(document).ready(function () {

    $(document).on('click', '.terminada', function () {

        const terminarId = this.id;
        console.log(terminarId);

        const split = terminarId.split('+')
        const id_paciente = split[0]
        console.log(id_paciente);
        const fecha_evento = split[1]
        console.log(fecha_evento);


        var request = $.ajax({
            url: '/AppEnfermeria/php/wb_Ctareas.php',
            method: "POST",
            data: {
                "accion": "terminar_tarea",
                'token': localStorage.getItem('token'),
                "datos_tarea":{
                    'id_paciente' : id_paciente,
                    'fecha_evento' : fecha_evento,
                }

            },

            dataType: "json"
        });

        request.done(function (response) {


            location.reload();
        });

        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });


    });
});