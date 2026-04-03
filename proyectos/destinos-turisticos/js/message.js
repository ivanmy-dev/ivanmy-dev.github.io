function enviarFormulario(event) {
    event.preventDefault();

    var name = document.getElementById('nombre');
    var email = document.getElementById('email');
    var msg = document.getElementById('mensaje');

    if (name.value.trim() === '' || email.value.trim() === '' || msg.value.trim() === '') {
        swal({
            title: "Atención",
            text: "Por favor, completa todos los campos.",
            icon: "warning",
            button: {
                text: "OK",
                className: "swal-button--custom", 
            }
        });
        return;
    }

    swal({
        title: "¡Mensaje Enviado!",
        text: "Gracias " + name.value + ", te contactaremos pronto.",
        icon: "success", 
        button: {
            text: "Entendido",
            className: "swal-button--custom",
        },
    }).then(() => {
        name.value = '';
        email.value = '';
        msg.value = '';
    });
}

const btnLogin = document.getElementById('btnLogin');

if (btnLogin) {
    btnLogin.addEventListener('click', function(event) {
        event.preventDefault();

        swal({
            title: "Login Inhabilitado",
            text: "Esta es una versión de prueba para el portafolio. El módulo de autenticación y la base de datos no están habilitados en este prototipo.",
            icon: "info",
            button: {
                text: "OK",
                className: "swal-button--custom",
            },
        });
    });
}