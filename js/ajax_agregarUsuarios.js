$(document).ready(function () {
 $("#btnAgregarUsuario").click(function (){
        let nombre = $("#nombre_usuario").val();
        let apellido = $("#apellidos_usuario").val();
        let fecha_nacimiento = $("#fecha_nacimiento_usuario").val();
        let email = $("#email_usuario").val();
        let genero = $("input:radio[name=genero]:checked").val();
        let telefono = $("#telefono_usuario").val();
        let contrasenya = $("#contrasenya_usuario").val();
        let grupo =  $("#grupo_tecnicos_rellenar").val();
        let rol = $("#rol").val();

        const admin = document.querySelector('#admin_usuario').checked;

        if (admin){
            $admin = 1;
        }else{
            $admin = null;
        }

     if (email==""){
         var string = `     <div aria-hidden="true" class="modal fade bd-example-modal-sm" role="dialog"
                                                     style="display: none;" tabindex="-1">
                                                    <div class="modal-dialog modal-sm">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title">Advertencia</h5>
                                                                <button aria-label="Close" class="close" data-dismiss="modal"
                                                                        type="button">
                                                                    <span aria-hidden="true">×</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <p>¡El email debe contener algún valor!</p>
                                                            </div>
                                                            <div class="modal-footer">
                                                                
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cambiar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>`;
         $("#rellenar_modal_usuarios").html(string);

     }else {
        var request = $.ajax({
            url: '../php/wb_Cusuarios.php',
            method: "POST",
            data: {
                "accion": "agregar_usuario",
                "datos_usuario":{
                    "nombre":nombre,
                    "apellido":apellido,
                    "fecha_nacimiento":fecha_nacimiento,
                    "email":email,
                    "genero":genero,
                    "telefono":telefono,
                    "contrasenya":contrasenya,
                    "admin":$admin,
                    "rol":rol,
                    "grupo":grupo,


                },
                'token': localStorage.getItem('token'),
            },
            dataType:"json"
        });
        request.done(function (response) {
            //Si se introduce el usuario se redirige a la pagina de pacientes y en caso contrario te imprime una alerta en la pantalla
            if (response['success'] === true) {
                window.location.href = "../html/personal.html";
            }else {

                var string = `  
                    <div class="alert alert-danger" role="alert">
                        No se ha podido introducir el usuario en la base de datos
                    </div>`
                $("#alerta_usuario").html(string);


            }
        });
            request.fail(function (jqXHR, textStatus) {

            });
        }
    });

});