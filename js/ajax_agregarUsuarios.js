$(document).ready(function () {


    $("#btnAgregarUsuario").click(function (){
        console.log("aquiii");
        let nombre = $("#nombre_usuario").val();
        let apellido = $("#apellidos_usuario").val();
        let fecha_nacimiento = $("#fecha_nacimiento_usuario").val();
        let email = $("#email_usuario").val();
        let genero = $("input:radio[name=genero_usuario]:checked").val();
        let telefono = $("#telefono_usuario").val();
        let contrasenya = $("#contrasenya_usuario").val();
        let grupo = $("#").val();
        let rol = $("#rol").val();

        const admin = document.querySelector('#admin_usuario').checked;
        const activo = document.querySelector('#activo_usuario').checked;

        if (admin){
            $admin = 1;
        }else{
            $admin = null;
        }
        if (activo){
           var  $fecha =  new Date();
           $activo = "".concat($fecha.getFullYear() , "-",$fecha.getMonth(),"-",$fecha.getDay(), " ", $fecha.toLocaleTimeString());
        }else{
            $activo = null;
        }

        console.log($activo);






        var request = $.ajax({
            url: '../php/wb_Cusuarios.php',
            method: "POST",
            data: {
                "accion": "agregar_usuario",
                "datos_paciente":{
                    "nombre":nombre,
                    "apellido":apellido,
                    "fecha_nacimiento":fecha_nacimiento,
                    "email":email,
                    "genero":genero,
                    "telefono":telefono,
                    "contrasenya":contrasenya,
                    "admin":admin,
                    "activo":activo,
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