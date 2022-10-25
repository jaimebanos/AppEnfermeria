$( document ).ready(function() {
    console.log("Ready");

    // BOTON CONECTAR
    $("#enviar").click(function () {

        /* Capturamos si al concetarnos está el check marcado o no
        *  WARNING- Devuelve un string en formate true o false!!*/
        let $value_check = $("#remember_check")[0].checked;

        var request = $.ajax({
            url: "web_controler.php",
            method: "POST",
            data: {
                "accion": "login",
                "datos": {
                    'dni':$("#dni").val(),
                    'pass':$("#pass").val(),
                    'check': $value_check,
                }

            },
            dataType: "json"
        });
        
        request.done(function (msg) {
          console.log(msg);
        });

        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
    });


});