$(document).on('click', '.editar_paciente', function(){
    let telefono =$(this).parent().parent().children().first().text();
    sessionStorage.setItem("telefono",telefono);
    window.location.href="../html/editar_paciente.html";

})