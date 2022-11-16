$(document).ready(function() {


    $("#cerrar_sesion").click(function (){
        var request = $.ajax({
            url: '/AppEnfermeria/php/wb_Cusuarios.php',
            method: "POST",
            data: {
                "accion": "cerrar_sesion",
                'token': localStorage.getItem('token'),
            },
            dataType:"json"
        });
        request.done(function (msg) {

        });

        request.fail(function (jqXHR, textStatus) {

        });
    });
});