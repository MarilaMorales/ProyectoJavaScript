let btnEnviar = document.getElementById("btnEnviar");

// Se llama 
btnEnviar.addEventListener("click", function() {
    
    // Obtener los datos de los inputs
    let correoLog = document.getElementById("correoLog").value;
    let contrasenaLog = document.getElementById("contrasenaLog").value;


    let user = JSON.parse(localStorage.getItem(correoLog));

    // Obtener el contenedor de error
    let loginError = document.getElementById("loginError");

    // Verificar si el usuario existe
    if (user === null) {
        loginError.textContent = "Usuario no encontrado";
        return;
    }

    // Verificar si la contraseña es incorrecta

    if (user.contrasena1 !== contrasenaLog) {
        loginError.textContent = "Contraseña Incorrecta";
        document.getElementById("correoLog").value = "";
        document.getElementById("contrasenaLog").value = "";
        return;
    }

    
    window.location.href = "../Index-Principal/Index.html";
});

