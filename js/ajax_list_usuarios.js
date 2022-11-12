$(document).ready(function () {


    /**
     * Si el usuario no se puede imprimir por pantalla a los profesores se imprime por consola el error
     */


        var request = $.ajax({
            url: '../php/wb_Cusuarios.php',
            method: "POST",
            data: {
                "accion": "listUser",
                'token': localStorage.getItem('token')
            },
            dataType: "json"
        });

        request.done(function (response) {
            /**
             * Para imprimir en pantalla las tarjetas de los profesores disponibles en la base de datos en Personal.php
             * @type {array}
             */

            //COMPRUEBA SI LA RESPUESTA ES UN FALSE, LO CUAL QUIERE DECIR QUE NO TIENE TOKEN, Y LO DEVUELVE AL LOGIN
            if (response['success'] === false) {
                window.location.href = "login.html";
            }
            console.log("llega aqui");

            var fillDiv = response;
            fillDiv = fillDiv.data;
            var string = ``;
            console.log(response['data'].telefono);
            fillDiv.forEach((element) => {
                var activo;
                if(element.inactivo === null ){
                    activo ="Si";
                }else{ activo ="No";}

                var admin;
                if(element.admin ===null ||  element.admin ==0){
                    admin ="No";
                }else{ admin ="Si";}


                string += `            
                  
                     
                  
                  
                                 <tr class="hide" id-dni="${element.email}"  >
                                    <td>${element.id_usuario}</td>
                                    <td>${element.nombre}</td>
                                    <td>${element.apellidos}</td>
                                    <td>${admin}</td>
                                    <td>${element.rol}</td>
                                    <td>${element.activos}</td>
                                    <td> ${activo}</td>
                                    <td><button  class="btn-outline-info btn-sm ver_usuario"  ><i class="ion-search "></i></button></td>
                                    <td><button  class="btn-outline-dark btn-sm editar_usuario"  ><i class="ion-edit "></i></button></td>

                                    <td>

                                       <button class=" btn-sm btn-outline-danger eliminar_usuario"   data-toggle="modal" data-target="#eliminar"
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
                                                   ¿Desea eliminar a este Usuario ?
                                                </div>
                                                <div class="modal-footer">
                                                   <button type="button" class="btn-outline-success"
                                                      data-dismiss="modal">Cancelar</button>
                                                   <button type="button"  data-dismiss="modal" class="btn-outline-danger eliminar_usuario_confirm">Aceptar</button>
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
            $("#userListar").html(string);


        });

        request.fail(function (jqXHR, textStatus) {
            console.log("Error profesores");
            alert("Request failed: " + textStatus);
        });



});