$(document).ready(function() {
    /**
     * Si el usuario no se puede imprimir por pantalla a los administradores se imprime por consola el error
     */

    $("#verAdmin").click(function () {

        var request = $.ajax({
            url: '../php/wb_Cadmins.php',
            method: "POST",
            data: {
                "accion": "listUser",
                'token': sessionStorage.getItem('token'),
            },
            dataType:"json"
        });

        request.done(function (response) {
            /**
             * Para imprimir en pantalla las tarjetas de los administradores disponibles en la base de datos en Personal.php
             * @type {array}
             */

            //COMPRUEBA SI LA RESPUESTA ES UN FALSE, LO CUAL QUIERE DECIR QUE NO TIENE TOKEN, Y LO DEVUELVE AL LOGIN
            if(response['success']===false){
                window.location.href = "login.html";
            }

            var fillDiv = response;
            fillDiv = fillDiv.data;
            var string = ` <div class="col-sm-12">
                  <div class="iq-card">
                     <div class="iq-card-header d-flex justify-content-between">
                        <div class="iq-header-title">
                           <h4 class="card-title">Administradores</h4>
                        </div>
                        <div class="iq-waves-effect d-flex align-items-center">
                        
                           </div>
                       
                     </div>
                  </div>
               </div>`;

            fillDiv.forEach((element) => {
                string += `            
                <div class="col-sm-6 col-md-3">
                  <div class="iq-card">
                     <div class="iq-card-body text-center">
                        <div class="doc-profile">
                           <img class="rounded-circle img-fluid avatar-80" src="../images/user/12.jpg" alt="profile">
                        </div>
                        <div class="iq-doc-info mt-3">
                           <h4> ${element.nombre} ${element.apellidos}</h4>
                           <p class="mb-0">${element.id_usuario}</p>
                        </div>
                      
                        <div class="iq-doc-social-info mt-3 mb-3">
                           <ul class="m-0 p-0 list-inline">
                              <li><a href="editar_perfil.html" class=" btn-outline-dark"><i class="las la-edit"></i></a> </li>
                              <li><a class=" btn-outline-info" href="perfil_personal.html"><i class="ion-search"></i></a> </li>
                              <li ><a class=" btn-outline-danger " href="personal.html" data-toggle="modal" data-target="#eliminar"><i class=" fa fa-trash" ></i></i></a> </li>

                                 <!--Mediante data-target "eliminar " nos sale la siguiente notifcación para eliminar un enefermero--->
                                 <div class="modal fade" id="eliminar" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                       <div class="modal-content">
                                          <div class="modal-header">
                                             <h5 class="modal-title" id="exampleModalCenterTitle">Advertencia</h5>
                                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                             <span aria-hidden="true">×</span>
                                             </button>
                                          </div>
                                          <div class="modal-body">
                                             ¿Desea eliminar a este Enfermero?
                                          </div>
                                          <div class="modal-footer">
                                             <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                             <button type="button" class="btn btn-primary">Aceptar</button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                           
                           </ul>
                        </div>

                     </div>
                  </div>
               </div>
`;
            });

            /**
             * Imprimir en el contenedor correspondiente
             */
            $("#adminsVer").html(string);



        });

        request.fail(function (jqXHR, textStatus) {
            console.log("Error administradores");
            alert("Request failed: " + textStatus);
        });

    });



});