$(document).ready(function () {


   //TE CARGA EL PERFIL INICIAL, CON TU NOMBRE Y LA INFORMACIÓN NECESARIA
    var request = $.ajax({
        url: 'php/wb_Cusuarios.php',
        method: "POST",
        data: {
            "accion": "MostrarInfo",
            'token': localStorage.getItem('token'),
        },
        dataType: "json"
    });

    request.done(function (msg) {
        //Si no tienes token, te devolverá false e iras al login
        if (msg['success'] === false) {
            window.location.href = "html/login.html";
        }

        //Te rellena el nav básico, nombre y saludo
        $("#name_user").text(msg['data'][0]['nombre']);
        $("#saludo_user").text("Bievenido "+ msg['data'][0]['nombre']);
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
            // NO HACE NADA, YA QUE EL BOTON TIENE SU HREF, DENTRO DEL HTML, ESTO SIMPLEMENTE EJECUTA LA FUNCION BORRAR
        });

        request.fail(function (jqXHR, textStatus) {

        });
    });


});
