$(document).ready(function () {
    $(document).on('click', '#agregar_tarea', function(){
        window.location.href="../html/crear_tarea.html";
    });


    $(document).on('click', '#btnCrearTarea', function(){

        let tipo_evento = $("#tipo_evento").val();
        let pacientes_tarea = $("#pacientes_tarea").val();
        let usuario_tarea = $("#usuario_tarea").val();
        let fecha_evento = $("#fecha_evento").val();
        let observaciones = $("#observaciones").val();
    var request = $.ajax({
        url: '../php/wb_Ctareas.php',
        method: "POST",
        data: {
            "accion": "agregar_evento",
            "datos_tarea": {
                "tipo_evento": tipo_evento,
                "pacientes_tarea": pacientes_tarea,
                "usuario_tarea": usuario_tarea,
                "fecha_evento": fecha_evento,
                "observaciones": observaciones,
            },
            'token': localStorage.getItem('token'),
        },
        dataType: "json"
    });
    request.done(function (response) {
        //Si se introduce el paciente se redirige a la pagina de pacientes y en caso contrario te imprime una alerta en la pantalla
        if (response['success'] === true) {
            window.location.href = "../html/tareas.html";





        }
    });

    request.fail(function (jqXHR, textStatus) {

    });
    });
});

