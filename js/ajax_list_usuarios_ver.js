$(document).ready(function() {
    $(document).on('click', '.ver_usuario', function(){
        let email =$(this).parent().parent().children().first().text();

        console.log(email);
        sessionStorage.setItem("email",email);
        window.location.href="../html/perfil_personal.html";
    })
});

