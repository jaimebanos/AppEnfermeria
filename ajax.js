$( document ).ready(function() {
    console.log("Ready");

    // BOTON CONECTAR
    $("#enviar").click(function () {
        var request = $.ajax({
            url: "web_controler.php",
            method: "POST",
            data: {
                "accion": "login",
                "datos": {'dni':$("#dni").val(),
                            'pass':$("#pass").val()}

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