$(document).ready(function () {

    $(document).on('click', '#rol', function() {


            if (this.value == "profesor") {
                s2.value="null";
                s2.disabled = true;
            }else {


            }
    });

    var request = $.ajax({
        url: '../php/wb_Cusuarios.php',
        method: "POST",
        data: {
            "accion": "obtener_grupo_select",
            'token': localStorage.getItem('token'),
        },
        dataType:"json"
    });
    request.done(function (response) {

        console.log(response.data);
        var fillDiv = response;
        fillDiv = fillDiv.data;
        var string = ``;

        fillDiv.forEach((element) => {

            string += ` <option value="${element.id}">${element.nombre}</option>`;
        });



        /**
         * Imprimir en el contenedor correspondiente
         */


        $("#grupo_tecnicos_rellenar").html(string);


    });




    var request = $.ajax({
        url: '../php/wb_Cusuarios.php',
        method: "POST",
        data: {
            "accion": "obtener_usuario_asignado_select",
            'token': localStorage.getItem('token'),
        },
        dataType:"json"
    });
    request.done(function (response) {

        var fillDiv = response;
        fillDiv = fillDiv.data;
        var string = ``;

        fillDiv.forEach((element) => {

            string += ` <option value="${element.email}">${element.email}</option>`;
        });



        /**
         * Imprimir en el contenedor correspondiente
         */


        $("#usuario_asignado_rellenar").html(string);


    });



});