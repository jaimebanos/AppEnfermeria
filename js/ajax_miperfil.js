$(document).ready(function () {



    /**
     * Si el usuario no se puede imprimir por pantalla a los administradores se imprime por consola el error
     */


    var request = $.ajax({
        url: '../php/wb_Cusuarios.php',
        method: "POST",
        data: {
            "accion": "MostrarInfo",
            'token': localStorage.getItem('token')},

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
                        <div class="row  pr-3">
                        <div class="col-4">Dni:</div>
                            <div class="col-8">Por crear</div>
                            <div class="col-4">Nombre:</div>
                            <div class="col-8">${element.nombre}</div>
                            <div class="col-4">Apellido:</div>
                            <div class="col-8">${element.apellidos}</div>
                            <div class="col-4">Edad:</div>
                            <div class="col-8">${element.edad}</div>
                            <div class="col-4">Fecha de nacimiento:</div>
                            <div class="col-8">${element.fecha_nacimiento}</div>
                            <div class="col-4">Email:</div>
                            <div class="col-8">${element.id_usuario}</div>
                            <div class="col-4">Grupo:</div>
                            <div class="col-8">${element.nombre_grupo}</div>
                            <div class="col-4">Teléfono:</div>
                            <div class="col-8">${element.telefono}</div>
                            <div class="col-4">Género:</div>
                            <div class="col-8">${element.genero}</div>
                            
                        </div>
                        <hr>
                        <a href="editar_perfil.html">
                        <button
                          class="btn-block btn btn-outline-info"
                          href="editar_perfil.html"
                        >
                          <i class="las la-edit"></i>Editar Perfil
                        </button>
                      </a>
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
