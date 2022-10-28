$( document ).ready(function() {
    $("#nombre").text($("#nombre").val() + " " + sessionStorage.getItem("nombre"));
    $("#dni").text($("#dni").val() + " " + sessionStorage.getItem("dni"));
});
