    let btnEnviar = document.getElementById("btnEnviar");
    
    btnEnviar.addEventListener("click", function() {
        // Obtener los valores ingresados por el usuario
        let usuario2 = document.getElementById("usuario1").value;
        let correo2 = document.getElementById("correo1").value;
        let contrasena2 = document.getElementById("contrasena1").value;


        if (usuario2 === "" || correo2 === "" || contrasena2==="") {
            alert("Por favor, llena todos los campos");
            return;
        }
        // Verificar si el usuario ya está registrado
        if (localStorage.getItem(correo2)) {
            alert("El usuario se encuentra ya registrado");
            return;
        }

        // Crear un objeto con los datos del usuario
        let user = {
            usuario1: usuario2,
            correo1: correo2,
            contrasena1: contrasena2
        };

        // Guardar el usuario en localStorage
        localStorage.setItem(correo2, JSON.stringify(user));   

        // Mostrar un mensaje de éxito y redirigir al usuario
        alert("Usuario registrado correctamente.");
        window.location.href = "../LogIn/LogIn.html";
    });
