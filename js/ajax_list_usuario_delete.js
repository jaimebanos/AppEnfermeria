$(document).ready(function() {
    $(document).on('click', '.eliminar_usuario', function(){
        let id =$(this).parent().parent().children().first().text();

        $(document).on('click', '.eliminar_usuario_confirm', function(){

            console.log(id);
            var request = $.ajax({
                url: '../php/wb_Cusuarios.php',
                method: "POST",
                data: {
                    "accion": "eliminar_usuario",
                    'token': localStorage.getItem('token'),
                    'email': id,
                },
                dataType: "json"
            });

            request.done(function (response) {
                location.reload();
            });

            request.fail(function (jqXHR, textStatus) {
                console.log("Error alumnos");
                alert("Request failed: " + textStatus);
            });

        })
    });

});