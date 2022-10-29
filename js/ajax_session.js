$(document).ready(function () {

    var request = $.ajax({
        async: true,
        url: 'php/wb_Cusuarios.php',
        method: "POST",
        data: {
            "accion": "comprobar_login",
            "datos": {
                'token': sessionStorage.getItem('token'),
            }

        },
        dataType: "json"
    });

    request.done(function (msg) {
        console.log("correcto");
        if (msg['success'] == false) {
            window.location.href = "html/login.html";
        }
    });

    request.fail(function (jqXHR, textStatus) {
        
    });


});
