$(document).ready(function() {
    /**
     * Rellena los datos del usuario existentes.
     * @type {{getAllResponseHeaders: function(): *|null, abort: function(*): this, setRequestHeader: function(*, *): this, readyState: number, getResponseHeader: function(*): null|*, overrideMimeType: function(*): this, statusCode: function(*): this}|jQuery}
     */
    var request = $.ajax({
        url: '../php/wb_Cusuarios.php',
        method: "POST",
        data: {
            "accion": "ver_usuario",
            "email":sessionStorage.getItem('email'),
            'token': localStorage.getItem('token'),
        },
        dataType:"json"
    });
    request.done(function (response) {


        if(response['success']===false){
            window.location.href = "../html/login.html";
        }
        console.log(response);

        console.log(response['data']);

        $(".nombre_usuario").html(response['data'][0]['nombre']);
        $("#apellido").html(response['data'][0]['apellidos']);
        $("#telefono").html(response['data'][0]['telefono']);
        $(".email").html(response['data'][0]['id_usuario']);
        $("#fecha_nacimiento").html(response['data'][0]['fecha_nacimiento']);
        $("#genero").html(response['data'][0]['genero']);
        $(".edad").html(response['data'][0]['edad']);
        $(".grupo").html(response['data'][0]['nombre_grupo']);


        if(response['data'][0]['genero']==='Hombre') {
            string = `<img src="../images/user/15.png" alt="profile-img"
                                                class="avatar-130 img-fluid">`;
            $("#rellenargenero").html(string);
        }else{

            string = `<img src="../images/user/11.png" alt="profile-img"
                                                class="avatar-130 img-fluid">`;
            $("#rellenargenero").html(string);
        }

        if(response['data'][0]['rol']=='profesor') {

            $("#cabecera_nombre").html("Ver Profesor");



        }else{


            $("#cabecera_nombre").html("Ver Técnico");
            $("#rellenar_grupo").html(`<li class="text-center"><h4 class="text-primary">Grupo</h4><h6 class="grupo">${response['data'][0]['nombre_grupo']}</h6></li> <li class="text-center">
                                            <h4 class="text-primary">Edad</h4>
                                            <h6 class="edad" >${response['data'][0]['edad']}</h6>
                                        </li>`);
        }



        //Para poder deseleccionar un grupo por defecto si es profesor
        const s1=document.getElementById("rol");
        const s2=document.getElementById("grupo_tecnicos_rellenar");

        if(response['data'][0]['rol']=='profesor') {

            s2.disabled = true;
        }else {
            s2.disabled = false;

        }


        if (response['data'][0]['admin']==='1') {
            $("#admin_usuario").prop("checked",true);
        }else{
            $("#admin_usuario").prop("checked", false);
        }




        $("#rol").val(response['data'][0]['rol']);
        $("#nombre_usuario").val(response['data'][0]['nombre']);
        $("#email_usuario").val(response['data'][0]['id_usuario']);
        $("#apellidos_usuario").val(response['data'][0]['apellidos']);
        $("#telefono_usuario").val(response['data'][0]['telefono']);
        $("#usuario_asignado_rellenar").val(response['data'][0]['usuario_asignado']);
        $("#fecha_nacimiento_usuario").val(response['data'][0]['fecha_nacimiento']);
        if(response['data'][0]['genero']==='Hombre') {
            $("#es_hombre").prop("checked",true);
        }else{
            $("#es_mujer").prop("checked", true);
        }

    });

    request.fail(function (jqXHR, textStatus) {
        console.log("Error")
    });

    /**
     * Si se le hace click al boton enviar, se enviarán los nuevos datos introducidos, y se hará un cambio a ese paciente
     * en la base de datos.
     * Si ha ido correcto, serás redirigido a la lista de pacientes.
     */
    $("#EditarUsuario").click(function (){

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
                    "accion": "editar_usuario",
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
                    'email':sessionStorage.getItem('email'),

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