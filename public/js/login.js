$('#btnLogin').on('click', function() {
    var url = "comunidade.html?user=" + encodeURIComponent($("#txtUsuario").val());
    window.location.href = url;
});