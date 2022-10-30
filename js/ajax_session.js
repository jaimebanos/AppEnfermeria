$(document).ready(function () {

   //TE CARGA EL PERFIL INICIAL, CON TU NOMBRE Y LA INFORMACIÓN NECESARIA
    var request = $.ajax({
        url: 'php/wb_Cusuarios.php',
        method: "POST",
        data: {
            "accion": "MostrarInfo",
            'token': sessionStorage.getItem('token'),
        },
        dataType: "json"
    });

    request.done(function (msg) {
        if (msg['success'] === false) {
            window.location.href = "html/login.html";
        }

        $("#name_user").text(msg['data'].nombre);
        $("#saludo_user").text("Bievenido "+ msg['data'].nombre);
    });

    request.fail(function (jqXHR, textStatus) {
        
    });

    //BOTON DE CERRAR SESION
    $("#cerrar_sesion").click(function () {
        console.log("hola");
        var request = $.ajax({
            url: 'php/wb_Cusuarios.php',
            method: "POST",
            data: {
                "accion": "cerrar_sesion",
                'token': sessionStorage.getItem('token'),
            },
            dataType: "json"
        });

        request.done(function (msg) {
            // NO HACE NADA, YA QUE EL BOTON TIENE SU HREF, DENTRO DEL HTML, ESTO SIMPLEMENTE EJECUTA LA FUNCION FORRAR
        });

        request.fail(function (jqXHR, textStatus) {

        });
    });


});
