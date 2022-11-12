$(document).ready(function() {
    $(document).on('click', '.eliminar_paciente', function(){
        let telefono =$(this).parent().parent().children().first().text();
        console.log("hola");

        $(document).on('click', '.eliminar_paciente_confirm', function(){
            console.log("dar de baja");

              var request = $.ajax({
                      url: '../php/wb_Cpacientes.php',
                      method: "POST",
                      data: {
                          "accion": "dar_baja",
                          'token': localStorage.getItem('token'),
                          'telefono_baja': telefono,
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