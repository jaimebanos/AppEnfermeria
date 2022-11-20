$(document).ready(function() {



    var request = $.ajax({
        url: '/AppEnfermeria/php/wb_Ctareas.php',
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
            window.location.href = "/AppEnfermeria/html/login.html";
        }

        var fillDiv = response;
        fillDiv = fillDiv.data;
        var string = ``;

        fillDiv.forEach((element) => {

            var nombre;
            var apellidos;
            var hora;
            var fecha;
            var evento;

            if (element.nombre_paciente===null){
                nombre = ""
            }else {
                nombre = element.nombre_paciente;
            }

            if ( element.apellido_paciente===null){
                apellidos = ""
            }else {
                apellidos = element.apellido_paciente;
            }
            if (element.fecha==="0-0-0"){
                fecha = ""
            }else {
                fecha = element.fecha;
            }
            if (element.hora==="0:0"){
                hora = ""
            }else {
                hora = element.hora;
            }
            if (element.tipo_evento==="Cumpleanyos"){
                evento = "Cumpleaños"
            }else {
                evento = element.tipo_evento;
            }



            string += `            
                  
                                <li>
                                    <h6 class="float-left mb-1">${evento}</h6><br>
                                    <small class="float-right mt-1">${fecha}</small>
                                    <h7>Telefono: ${element.id_paciente} <br> ${nombre}  ${apellidos}</h7>
                                    <div class="d-inline-block w-100">
                                        <p class="badge badge-primary">${hora}</p>
                                    </div>
                         
                         <div class="custom-control custom-switch custom-switch-color custom-control-inline">
                              <input type="checkbox" class="custom-control-input bg-success terminada" id="customSwitch02" >
                              <label class="custom-control-label" for="customSwitch02">Terminada</label>
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