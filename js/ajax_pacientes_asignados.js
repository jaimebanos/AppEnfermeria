$(document).ready(function() {



    var request = $.ajax({
        url: 'php/wb_Cpacientes.php',
        method: "POST",
        data: {
            "accion": "list_pacientes_asignados",
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
            string += `            
                  
                                 <tr class="hide" >
                                    <td >${element.telefono}</td>
                                    <td>${element.nombre}</td>
                                    <td>${element.apellidos}</td>
                                    <td>${element.edad}</td>
                                    <td>${element.dni}</td>
                                    <td><button  class="btn-outline-info btn-sm ver_paciente_index"  ><i class="ion-search "></i></button></td>
                                 </tr>
                                  
                                 
`;
        });

        /**
         * Imprimir en el contenedor correspondiente
         */
        $("#pacientes_asignados").html(string);



    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });


});