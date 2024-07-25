


document.getElementById("loginUsuarios").onsubmit = function (event) {
    event.preventDefault();
    validarLogin();
    
};


function validarLogin() {
    let correoLog = document.getElementById("correoLog").value;
    let contrasenaLog = document.getElementById("{contrasenaLog}").value;
   
    let user = JSON.parse(localStorage.getItem(correoLog)); // Aqui se obtiene la informacion guardada en el Local

    if (user=== null) {
        loginError.textContent="Usuario no encontrado";
        return;
    }
    if (user.contrasena1 !== contrasenaLog) {
        loginError.textContent="Contraseña Incorrecta";
        
        return;
    } else {
        
        window.location.href = "../Index-Principal/Index.html"
    }
}
