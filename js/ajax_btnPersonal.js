
$(document).ready(function() {
    /**
     *Comprobar si eres profesor o admin, para poder acceder
     * @type {{getAllResponseHeaders: (function(): *|null), abort: (function(*): jqXHR), setRequestHeader: (function(*, *): jqXHR), readyState: number, getResponseHeader: (function(*): null|*), overrideMimeType: (function(*): jqXHR), statusCode: (function(*): jqXHR)}|{getAllResponseHeaders: function(): *|null, abort: function(*): this, setRequestHeader: function(*, *): this, readyState: number, getResponseHeader: function(*): null|*, overrideMimeType: function(*): this, statusCode: function(*): this}|jQuery}
     */

        var request = $.ajax({
            url: '/AppEnfermeria/php/wb_Cusuarios.php',
            method: "POST",
            data: {
                "accion": "MostrarInfo",
                'token': localStorage.getItem('token'),
            },
            dataType: "json"
        });

        request.done(function (response) {
           if(response['data'][0].administrador==1){
               $("#personal").html(`<a href="personal.html"  class="iq-waves-effect" ><i class="ri-user-fill"></i><span>Personal</span></a>`);
           }else if(response['data'][0].rol === 'profesor'){
               $("#personal").html(`<a href="personal.html"  class="iq-waves-effect" ><i class="ri-user-fill"></i><span>Personal</span></a>`);
           }else{
               $("#personal").hide();
           }

        });

        request.fail(function (jqXHR, textStatus) {

        });
});