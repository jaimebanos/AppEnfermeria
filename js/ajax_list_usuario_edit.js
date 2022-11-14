$(document).ready(function() {
    $(document).on('click', '.editar_usuario', function(){
        let email =$(this).parent().parent().children().first().text();
        sessionStorage.setItem("email",email);
        window.location.href="../html/editar_usuario.html";
        console.log("edit1");

    })
});



