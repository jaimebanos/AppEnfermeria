$(document).ready(function () {


    $("#btnAgregarCliente").click(function (){
        let nombre = $("#nombre_usuario").val();
        let apellido = $("#apellidos_usuario").val();
        let dni = $("#dni_usuario").val();
        let fecha_nacimiento = $("#fecha_nacimiento_usuario").val();
        let email = $("#email_usuario").val();
        let genero = $("input:radio[name=genero_usuario]:checked").val();
        let telefono = $("#telefono_usuario").val();
        let contrasenya = $("#contrasenya_usuario").val();
        let grupo = $("#").val();
        let rol = $("#").val();
        let admin = $("#admin_usuario").val();
        let actvo = $("#activo_usuario").val();


        var request = $.ajax({
            url: '../php/wb_Cpacientes.php',
            method: "POST",
            data: {
                "accion": "agregar_paciente",
                "datos_paciente":{
                    "nombre":nombre,
                    "apellido":apellido,
                    "dni":dni,
                    "fecha_nacimiento":fecha_nacimiento,
                    "email":email,
                    "contrasenya":contrasenya,
                    "genero":genero,
                    "telefono":telefono,
                },
                'token': localStorage.getItem('token'),
            },
            dataType:"json"
        });
        request.done(function (msg) {
            console.log(msg)
        });

        request.fail(function (jqXHR, textStatus) {

        });
    });
});