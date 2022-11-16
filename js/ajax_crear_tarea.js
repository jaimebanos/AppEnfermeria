$(document).ready(function () {



    //Si se ha accedido desde perfil_personal.html para crear una tarea se obtine el email desde sessionStorage y se sobreescribe el select
    //En caso contrario si se accede desde tareas se destruye el sessionStorage email para poder verificar en el if si el sessionStorage en null te genera un select con
    //todos los usuarios y en caso contrario te genera solo el select del usuario donde se ha pulsado asignar_tarea

    $(document).on('click', '#agregar_tarea', function(){

        sessionStorage.removeItem('email');

        window.location.href="../html/crear_tarea.html";


    });



    $(document).on('click', '#btn_asignarTarea', function(){

        window.location.href="../html/crear_tarea.html";

        //Listar usuarios para el select en crear_tareas.html
        var request = $.ajax({
            url: '../php/wb_Cusuarios.php',
            method: "POST",
            data: {
                "accion": "ver_usuario",
                'token': localStorage.getItem('token'),
                "email":sessionStorage.getItem('email'),

            },
            dataType: "json"
        });
        request.done(function (response) {

            var fillDiv = response;
            fillDiv = fillDiv.data;
            var string = ``;

            fillDiv.forEach((element) => {

                string += ` <option value="${element.id_usuario}">${element.id_usuario}</option>`;
            });



            /**
             * Imprimir en el contenedor correspondiente
             */


            $("#usuario_tarea").html(string);


        });

    });


    if(sessionStorage.getItem('email') !== null){
         var email =sessionStorage.getItem('email');
        var string = ``;
        string += ` <option value="${email}">${email}</option>`;
        $("#usuario_tarea").html(string);


    }else {


        //Listar usuarios para el select en crear_tareas.html
        var request = $.ajax({
            url: '../php/wb_Cusuarios.php',
            method: "POST",
            data: {
                "accion": "listUser",
                'token': localStorage.getItem('token')
            },
            dataType: "json"
        });
        request.done(function (response) {

            var fillDiv = response;
            fillDiv = fillDiv.data;
            var string = ``;

            fillDiv.forEach((element) => {

                string += ` <option value="${element.id_usuario}">${element.id_usuario}</option>`;
            });



            /**
             * Imprimir en el contenedor correspondiente
             */


            $("#usuario_tarea").html(string);


        });    }




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

