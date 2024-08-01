let btnEnviar = document.getElementById("btnEnviar");


//event.prevent cancela el envio predeterminado del evento.
btnEnviar.addEventListener("click", function(event) {
    event.preventDefault();

    // Obtener los valores ingresados por el usuario
    let usuario2 = document.getElementById("usuario1").value;
    let correo2 = document.getElementById("correo1").value;
    let contrasena2 = document.getElementById("contrasena1").value;


    if (usuario2 === "" || correo2 === "" || contrasena2==="") {
        alert("Por favor, llena todos los campos");
        return;
    }

    if (localStorage.getItem(correo2)) {
        alert("El usuario ya esta registrado");
        return;
    }

    // Crear un objeto con los datos de los inputs
    let user = {
        usuario1: usuario2,
        correo1: correo2,
        contrasena1: contrasena2
    };

    // Guardar el usuario en localStorage bajo indentificador correo2
    localStorage.setItem(correo2, JSON.stringify(user));   

    alert("Usuario registrado.");
    window.location.href = "../LogIn/LogIn.html";   

});
