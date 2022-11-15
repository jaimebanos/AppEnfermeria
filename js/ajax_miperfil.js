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
        $("#pacientes_asignados").text( response['data'][0]['pacientes_asignados']);



        var elementos = response;
        elementos = elementos.data;
        var string = ``;

        elementos.forEach((element) => {
            string +=   `

<table class="table mb-0 table table-box-shadow">
                                            <thead>
                                            <tr>
                                                <th scope="col"><b>Información</b></th>
                                                <th scope="col"><b></b></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td><b>Nombre</b></td>
                                                <td >${element.nombre}</td>
                                            </tr>

                                            <tr>
                                                <td><b>Apellidos</b></td>
                                                <td >${element.apellidos}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Edad</b></td>
                                                <td >${element.edad}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Fecha de nacimiento</b></td>
                                                <td >${element.fecha_nacimiento}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Género</b></td>
                                                <td>${element.genero}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Teléfono</b></td>
                                                <td>${element.telefono}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Email</b></td>
                                                <td >${element.id_usuario}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Grupo</b></td>
                                                <td >${element.nombre_grupo}</td>
                                            </tr>                                         
                                            </tbody>
                                        </table>
`;
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
