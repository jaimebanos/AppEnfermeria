$(document).ready(function() {



    /**
     * Rellena los datos del paciente existentes.
     * @type {{getAllResponseHeaders: function(): *|null, abort: function(*): this, setRequestHeader: function(*, *): this, readyState: number, getResponseHeader: function(*): null|*, overrideMimeType: function(*): this, statusCode: function(*): this}|jQuery}
     */
    var request = $.ajax({
        url: '../php/wb_Cpacientes.php',
        method: "POST",
        data: {
            "accion": "ver_paciente",
            "telefono":sessionStorage.getItem('telefono'),
            'token': localStorage.getItem('token'),
        },
        dataType:"json"
    });
    request.done(function (response) {
        if(response['success']===false){
            window.location.href = "../html/login.html";
        }
        console.log("hola");

        var datosPciente = response;
        datosPciente = datosPciente.data;
        var string = response['data'].nombre;
        console.log(string);

        $(".nombre").html(response['data'].nombre);
        $("#apellido").html(response['data'].apellidos);
        $("#dni").html(response['data'].dni);
        $("#telefono").html(response['data'].telefono);
        $(".usuario_asignado").html(response['data'].usuario_asignado);
        $("#fecha_nacimiento").html(response['data'].fecha_nacimiento);
        $("#genero").html(response['data'].genero);
        $(".edad").html(response['data'].edad);
        $(".grupo").html(response['data'].grupo);

        if(response['data'].observaciones==="") {
            $("#observaciones").html("Sin observación");


        }else{
            $("#observaciones").html(response['data'].observaciones);

        }

        if(response['data'].genero==='Hombre') {
            string = `<img src="../images/user/15.png" alt="profile-img"
                                                class="avatar-130 img-fluid">`;
            $("#rellenargenero").html(string);
        }else{

            string = `<img src="../images/user/11.png" alt="profile-img"
                                                class="avatar-130 img-fluid">`;

            $("#rellenargenero").html(string);
        }


        $("#nombre").val(response['data'].nombre);
        $("#apellido").val(response['data'].apellidos);
        $("#dni").val(response['data'].dni);
        $("#telefono").val(response['data'].telefono);
        $("#usuario_asignado_rellenar").val(response['data'].usuario_asignado);
        $("#fecha_nacimiento").val(response['data'].fecha_nacimiento);
        $("#observaciones").val(response['data'].observaciones);
        if(response['data'].genero==='Hombre') {
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
    $("#Editar_paciente").click(function (){
        let nombre = $("#nombre").val();
        let apellido = $("#apellido").val();
        let dni = $("#dni").val();
        let fecha_nacimiento = $("#fecha_nacimiento").val();
        let observaciones = $("#observaciones").val();
        let usuario_asignado = $("#usuario_asignado_rellenar").val();
        let genero = $("input:radio[name=genero]:checked").val();
        let telefono = $("#telefono").val();

        var request = $.ajax({
            url: '../php/wb_Cpacientes.php',
            method: "POST",
            data: {
                "accion": "edit_paciente",
                "datos_paciente":{
                    "nombre":nombre,
                    "apellido":apellido,
                    "dni":dni,
                    "fecha_nacimiento":fecha_nacimiento,
                    "observaciones":observaciones,
                    "usuario_asignado":usuario_asignado,
                    "genero":genero,
                    "telefono":telefono,
                },
                'token': localStorage.getItem('token'),
            },
            dataType:"json"
        });
        request.done(function (response) {
            if(response['msg']=='login'){
                window.location.href = "login.html";
            }

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

    });
});