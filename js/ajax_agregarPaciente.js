$(document).ready(function () {


    $("#btnAgregarCliente").click(function (){


        let nombre = $("#nombre").val();
        let apellido = $("#apellido").val();
        let dni = $("#dni").val();
        let fecha_nacimiento = $("#fecha_nacimiento").val();
        let observaciones = $("#observaciones").val();
        let usuario_asignado = $("#usuario_asignado_rellenar").val();
        let genero = $("input:radio[name=genero]:checked").val();
        let telefono = $("#telefono").val();

        if (telefono==""){
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
                                                                <p>¡Numero de teléfono nulo!</p>
                                                            </div>
                                                            <div class="modal-footer">
                                                                
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cambiar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>`;
            $("#rellenar_modal").html(string);

        }else {
            var request = $.ajax({
                url: '../php/wb_Cpacientes.php',
                method: "POST",
                data: {
                    "accion": "agregar_paciente",
                    "datos_paciente": {
                        "nombre": nombre,
                        "apellido": apellido,
                        "dni": dni,
                        "fecha_nacimiento": fecha_nacimiento,
                        "observaciones": observaciones,
                        "usuario_asignado": usuario_asignado,
                        "genero": genero,
                        "telefono": telefono,
                    },
                    'token': localStorage.getItem('token'),
                },
                dataType: "json"
            });
            request.done(function (response) {
                //Si se introduce el paciente se redirige a la pagina de pacientes y en caso contrario te imprime una alerta en la pantalla
                if (response['success'] === true) {
                    window.location.href = "../html/pacientes.html";
                }else {

                    var string = `  
                    <div class="alert alert-danger" role="alert">
                        No se ha podido introducir el paciente en la base de datos
                    </div>`
                    $("#alerta_paciente").html(string);


                }
            });

            request.fail(function (jqXHR, textStatus) {

            });
        }
    });

});