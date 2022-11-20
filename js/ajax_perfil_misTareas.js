$(document).ready(function() {



    var request = $.ajax({
        url: '/AppEnfermeria/php/wb_Ctareas.php',
        method: "POST",
        data: {
            "accion": "ver_mis_tareas",
            'token': localStorage.getItem('token')},

        dataType:"json"
    });

    request.done(function (response) {

        //COMPRUEBA SI LA RESPUESTA ES UN PROBLEMA DE AUTH, LO CUAL QUIERE DECIR QUE NO TIENE TOKEN, Y LO DEVUELVE AL LOGIN
        if(response['msg']==="login"){
            window.location.href = "/AppEnfermeria/html/login.html";
        }

        $("#tareas_por_finalizar").text(response['data'][0].tareas_por_finalizar);

    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });


});