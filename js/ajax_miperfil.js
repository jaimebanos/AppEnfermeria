$(document).ready(function () {



    /**
     * Si el usuario no se puede imprimir por pantalla a los administradores se imprime por consola el error
     */


    var request = $.ajax({
        url: '../php/wb_Cusuarios.php',
        method: "POST",
        data: {
            "accion": "MostrarInfo",
            'token': sessionStorage.getItem('token')},

        dataType:"json"

    });


    request.done(function (response) {

        //COMPRUEBA SI LA RESPUESTA ES UN FALSE, LO CUAL QUIERE DECIR QUE NO TIENE TOKEN, Y LO DEVUELVE AL LOGIN
        if(response['success']===false){
            window.location.href = "login.html";
        }

        //CAMBIA EL NOMBRE DE ARRIBA DERECHA AL USUARIO QUE ES
        $(".nombre_user").text(response['data'][0]['nombre']);
        $("#saludo_user").text("Bievenido "+ response['data'][0]['nombre']);


        var elementos = response;
        elementos = elementos.data;
        var string = ``;

        elementos.forEach((element) => {
            string +=   `<div class="about-info m-0 p-0">
                        <div class="row">
                            <div class="col-4">First Name:</div>
                            <div class="col-8">${element.nombre}</div>
                            <div class="col-4">Last Name:</div>
                            <div class="col-8">${element.apellidos}</div>
                            <div class="col-4">Age:</div>
                            <div class="col-8">${element.edad}</div>
                            <div class="col-4">Position:</div>
                            <div class="col-8"></div>
                            <div class="col-4">Email:</div>
                            <div class="col-8">${element.email}</div>
                            <div class="col-4">Phone:</div>
                            <div class="col-8">${element.telefono}</div>
                            <div class="col-4">Location:</div>
                            <div class="col-8"></div>
                        </div>
                    </div>`;
        });
        /**
         * Imprimir en el contenedor correspondiente
         */
        $("#MiPerfil").html(string);

        });
        request.fail(function (jqXHR, textStatus) {
            console.log("Error perfil");
            alert("Request failed: " + textStatus);
        });



});
