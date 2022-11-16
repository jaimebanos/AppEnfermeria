$(document).ready(function() {
    $(document).on('click', '.ver_paciente', function(){
        let telefono =$(this).parent().parent().children().first().text();

        sessionStorage.setItem("telefono",telefono);
        window.location.href="/AppEnfermeria/html/perfil_pacientes.html";
    });

    $(document).on('click', '.ver_paciente_index', function(){
        let telefono =$(this).parent().parent().children().first().text();

        sessionStorage.setItem("telefono",telefono);
        window.location.href="/AppEnfermeria/html/perfil_pacientes.html";
    });
});


