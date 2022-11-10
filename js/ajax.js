$( document ).ready(function() {
    /**
     * Lanza la conexión, donde le mandará al servidor web, un dni, password y el check true o false
     * El servidor le tendrá que devolver un json, y con ese json guardaremos en sesion los siguientes datos:
     * Si el usuario existe...
     * 1- DNI
     * 2- Nombre
     *
     * Si el usuario no existe, se devolvera un json con success en false y un mensaje
     * de lo ocurrido
     */
    // BOTON CONECTAR
    $("#enviar").click(function () {
        var request = $.ajax({
            url: '../php/wb_Cusuarios.php',
            method: "POST",
            data: {
                "accion": "login",
                "datos": {
                    'email':$("#email").val(),
                    'pass':$("#pass").val(),
                }

            },
            dataType: "json"
        });
        
        request.done(function (msg) {
            if (msg['success']){
              localStorage.setItem("token",msg['data'].token)
              window.location.href = "../index.html";
            }
        });

        request.fail(function (jqXHR, textStatus) {
            console.log("Error");
            alert("Request failed: " + textStatus);
        });
    });




});