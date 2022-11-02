$(document).ready(function() {



    /**
     * Si el paciente no se puede imprimir por pantalla a los alumno se imprime por consola el error
     */


        var request = $.ajax({
            url: '../php/wb_Cpacientes.php',
            method: "POST",
            data: {
                "accion": "listUser",
                'token': sessionStorage.getItem('token')},

            dataType:"json"
        });

        request.done(function (response) {
            /**
             * Para imprimir en pantalla los pacientes disponibles en la base de datos en Pacientes.php
             * @type {array}
             */

            //COMPRUEBA SI LA RESPUESTA ES UN FALSE, LO CUAL QUIERE DECIR QUE NO TIENE TOKEN, Y LO DEVUELVE AL LOGIN
            if(response['success']===false){
                window.location.href = "login.html";
            }

            var fillDiv = response;
            fillDiv = fillDiv.data;
            var string = ``;

            fillDiv.forEach((element) => {
                string += `            
                  
                                 <tr class="hide" id-dni="${element.dni}"  >
                                    <td >${element.dni}</td>
                                    <td>${element.nombre}</td>
                                    <td>${element.apellidos}</td>
                                    <td>${element.patologias}</td>                                    
                                    <td>${element.Fecha_nacimiento}</td>
                                    <td>${element.localidad}</td>
                                    <td>${element.telefono}</td>
                                    <td>${element.observaciones}</td>
                                    <td><button  class="btn-outline-info btn-sm ver_paciente"  ><i class="ion-search "></i></button></td>
                                    <td><button  class="btn-outline-dark btn-sm editar_paciente"  ><i class="ion-edit "></i></button></td>

                                    <td>

                                       <button class=" btn-sm btn-outline-danger eliminar_paciente"   data-toggle="modal" data-target="#eliminar"
                                           ><i
                                             class=" fa fa-trash"></i></i></button>

                                              <!--Mediante data-target "eliminar " nos sale la siguiente notifcación para eliminar un enefermero--->
                                     <div class="modal fade" id="eliminar" tabindex="-1" role="dialog"
                                          aria-labelledby="exampleModalCenterTitle" style="display: none;"
                                          aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                             <div class="modal-content">
                                                <div class="modal-header">
                                                   <h5 class="modal-title" id="exampleModalCenterTitle">Advertencia</h5>
                                                   <button type="button" class="close" data-dismiss="modal"
                                                      aria-label="Close">
                                                      <span aria-hidden="true">×</span>
                                                   </button>
                                                </div>
                                                <div class="modal-body">
                                                   ¿Desea eliminar a este Paciente ?
                                                </div>
                                                <div class="modal-footer">
                                                   <button type="button" class="btn-outline-success"
                                                      data-dismiss="modal">Cancelar</button>
                                                   <button type="button"  data-dismiss="modal" class="btn-outline-danger eliminar_paciente_confirm">Aceptar</button>
                                                </div>
                                             </div>
                                               </div>
                                          </div>


                                    </td>
                                 </tr>
                                 
`;
            });

            /**
             * Imprimir en el contenedor correspondiente
             */
            $("#pacientesListar").html(string);



        });

        request.fail(function (jqXHR, textStatus) {
            console.log("Error alumnos");
            alert("Request failed: " + textStatus);
        });



});