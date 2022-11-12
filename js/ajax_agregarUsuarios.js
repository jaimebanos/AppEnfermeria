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
        request.done(function (msg) {
            console.log(msg)
        });

        request.fail(function (jqXHR, textStatus) {

        });
    });
});