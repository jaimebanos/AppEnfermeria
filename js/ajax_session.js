$(document).ready(function () {

    let token;

    if(sessionStorage.getItem('token')==""){
        token = localStorage.getItem('token');
    }else{
        token = sessionStorage.getItem('token');
    }
    var request = $.ajax({
        url: 'php/wb_Cusuarios.php',
        method: "POST",
        data: {
            "accion": "comprobar_login",
            "datos": {
                'token': token,
            }

        },
        dataType: "json"
    });

    request.done(function (msg) {
        if (msg['success'] === false) {
            window.location.href = "html/login.html";
        }
    });

    request.fail(function (jqXHR, textStatus) {
        
    });


});
