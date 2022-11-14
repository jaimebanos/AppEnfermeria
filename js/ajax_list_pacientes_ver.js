$(document).ready(function() {
    $(document).on('click', '.ver_paciente', function(){
        let telefono =$(this).parent().parent().children().first().text();

        sessionStorage.setItem("telefono",telefono);
        window.location.href="../html/perfil_pacientes.html";
        })
    });

