$(document).ready(function() {
    $(document).on('click', '.eliminar_paciente', function(){
        let id =$(this).parent().parent().children().first().text();






        $(document).on('click', '.eliminar_paciente_confirm', function(){

        console.log(id);



              var request = $.ajax({
                      url: '../php/wb_Cpacientes.php',
                      method: "POST",
                      data: {
                          "accion": "eliminar_paciente",
                          'token': sessionStorage.getItem('token'),
                          'id_eliminar': id,
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