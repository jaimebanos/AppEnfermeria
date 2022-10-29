$(document).ready(function() {
    /**
     * Si el paciente no se puede imprimir por pantalla a los alumno se imprime por consola el error
     */


        var request = $.ajax({
            url: '../php/wb_Cpacientes.php',
            method: "POST",
            data: {
                "accion": "listUser"},
        "datos": {
            'token': sessionStorage.getItem('token'),
        }
        });

        request.done(function (response) {
            /**
             * Para imprimir en pantalla los pacientes disponibles en la base de datos en Pacientes.php
             * @type {array}
             */
            var fillDiv = JSON.parse(response);
            fillDiv = fillDiv.data;
            var string = ``;

            fillDiv.forEach((element) => {
                string += `            
                  
                                 <tr class="hide" id="${element.id_usuario}" >
                                    <td>${element.dni}</td>
                                    <td>${element.nombre}</td>
                                    <td>${element.apellidos}</td>
                                    <td>${element.patologias}</td>                                    
                                    <td>${element.Fecha_nacimiento}</td>
                                    <td>${element.localidad}</td>
                                    <td>${element.telefono}</td>
                                    <td>${element.observaciones}</td>
                                    <td><a href="perfil_pacientes.html"> <button  class="btn-outline-info btn-sm"  ><i class="ion-search "></i></button></a></td>
                                    <td><a href="editar_pacientes.html"> <button  class="btn-outline-dark btn-sm"  ><i class="ion-edit "></i></button></a></td>

                                    <td>

                                       <button class=" btn-sm btn-outline-danger " href="enfermeros.html"
                                          data-toggle="modal" data-target="#eliminar"><i
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
                                                   ¿Desea eliminar a este Paciente?
                                                </div>
                                                <div class="modal-footer">
                                                   <button type="button" class="btn-outline-success"
                                                      data-dismiss="modal">Cancelar</button>
                                                   <button type="button" class="btn-outline-danger ">Aceptar</button>
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