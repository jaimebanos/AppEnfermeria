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
            if(response['success']===true){
                window.location.href = "../html/pacientes.html";
            }
        });
        
        request.fail(function (jqXHR, textStatus) {

        });
    });
});