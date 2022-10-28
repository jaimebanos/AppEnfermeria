$(document).ready(function() {
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


        var request = $.ajax({
            url: '../php/web_controler.php',
            method: "POST",
            data: {
                "accion": "listUsers",
                "datos": {
                    'token': sessionStorage.getItem('token'),
                }


            },
            dataType: "json"
        });

        request.done(function (msg) {

            console.log(response)
            if (msg['success']){
                console.log("Listar Tabla");
                if ($value_check) {
                    localStorage.setItem("token", msg['data'].token)

                }else{
                    sessionStorage.setItem("token",msg['data'].token)
                }

            }
        });

        request.fail(function (jqXHR, textStatus) {
            console.log("Error");
            alert("Request failed: " + textStatus);
        });




});