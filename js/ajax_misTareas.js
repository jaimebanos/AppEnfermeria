+$(document).ready(function() {



    var request = $.ajax({
        url: 'php/wb_Ctareas.php',
        method: "POST",
        data: {
            "accion": "ver_mis_tareas",
            'token': localStorage.getItem('token')},

        dataType:"json"
    });

    request.done(function (response) {
        /**
         * Para imprimir en pantalla los pacientes disponibles en la base de datos en Pacientes.php
         * @type {array}
         */

        //COMPRUEBA SI LA RESPUESTA ES UN FALSE, LO CUAL QUIERE DECIR QUE NO TIENE TOKEN, Y LO DEVUELVE AL LOGIN
        if(response['msg']==="login"){
            window.location.href = "login.html";
        }

        var fillDiv = response;
        fillDiv = fillDiv.data;
        var string = ``;

        fillDiv.forEach((element) => {
            string += `            
                  
                                <li>
                                    <h6 class="float-left mb-1">${element.tipo_evento}</h6><br>
                                    <small class="float-right mt-1">${element.fecha}</small>
                                    <h7>Telefono: ${element.id_paciente} <br> Nombre: ${element.nombre_paciente}</h7>
                                    <div class="d-inline-block w-100">
                                        <p class="badge badge-primary">${element.hora}</p>
                                    </div>
                         
                                </li>
                                <hr>
                                  
                                 
`;
        });

        /**
         * Imprimir en el contenedor correspondiente
         */
        $("#rellenar_tareas").html(string);



    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });


});