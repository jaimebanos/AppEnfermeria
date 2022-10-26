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

        /* Capturamos si al concetarnos está el check marcado o no
        *  WARNING- Devuelve un string en formate true o false!!*/
        var $value_check = $("#remember_check")[0].checked;

        var request = $.ajax({
            url: "web_controler.php",
            method: "POST",
            data: {
                "accion": "login",
                "datos": {
                    'dni':$("#dni").val(),
                    'pass':$("#pass").val(),
                }

            },
            dataType: "json"
        });
        
        request.done(function (msg) {
          if (msg['success']){
              if ($value_check) {
                  localStorage.setItem("token", msg['data'].token)

              }else{
                  sessionStorage.setItem("token",msg['data'].token)
              }
              window.location.href = "\\AppEnfermeria\\Sesion\\index.html";
          }
        });

        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
    });

    /*Sesion Iniciado*/



});