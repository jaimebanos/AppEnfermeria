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
            }else if (response['success'] === true){
                window.location.href = "pacientes.html";
            }

        });

        request.fail(function (jqXHR, textStatus) {

        });

    });
});