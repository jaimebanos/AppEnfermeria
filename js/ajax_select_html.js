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






    //Listar los pacientes en un select en crear_tareas.html
    var request = $.ajax({
        url: '../php/wb_Cpacientes.php',
        method: "POST",
        data: {
            "accion": "listUser",
            'token': localStorage.getItem('token'),
        },
        dataType:"json"
    });
    request.done(function (response) {

        var fillDiv = response;
        fillDiv = fillDiv.data;
        var string = ``;

        var apellido;
        var nombre;
        fillDiv.forEach((element) => {
            if(element.apellido==null){
                apellido = '';
            }else {
                apellido = element.apellido;
            }

            if(element.nombre==null){
                nombre = '';
            }else {
                nombre = element.nombre;
            }


            string += ` <option value="${element.telefono}">${element.telefono}   -> ${nombre}  ${apellido}</option>`;
        });



        /**
         * Imprimir en el contenedor correspondiente
         */


        $("#pacientes_tarea").html(string);


    });





});