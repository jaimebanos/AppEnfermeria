$(document).ready(function() {
    /**
     * Te rellena los datos mas básicos del nav, Nombre y saludo, se ha creado, para ahorrar codigo, y al que haya que rellenarle el nav,
     * solo hay que importar el script
     */



    var request = $.ajax({
        url: '/AppEnfermeria/php/wb_Cusuarios.php',
        method: "POST",
        data: {
            "accion": "MostrarInfo",
            'token': localStorage.getItem('token'),
        },
        dataType: "json"
    });

    request.done(function (response) {
        if(response['success']===false){
            window.location.href = "/AppEnfermeria/html/login.html";
        }

        $(".nombre_user").text(response['data'][0]['nombre']);
        $(".saludo_user").html("Bienvenido "+ response['data'][0]['nombre']);

    });

    request.fail(function (jqXHR, textStatus) {

    });
});