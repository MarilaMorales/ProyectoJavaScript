document.getElementById("registroUsuarios").onsubmit = function (event) {
    event.preventDefault();
    registrarUsuario();
};

// Inicio de sesion
document.getElementById("loginUsuarios").onsubmit = function (event) {
    event.preventDefault();
    validarLogin();
};


function registrarUsuario() {
   
    let usuario2 = document.getElementById("usuario1").value;
    let correo2 = document.getElementById("correo1").value;
    let contrasena2 = document.getElementById("contrasena1").value;
   

let user = {
    usuario1: usuario2,
    correo1: correo2,
    contrasena1: contrasena2
};
   
console.log(user);

localStorage.setItem(correo2, JSON.stringify(user));   

}


function validarLogin() {
    let correoLog = document.getElementById("correoLog").value;
    let contrasenaLog = document.getElementById("contrasenaLog").value;
   
    let user = JSON.parse(localStorage.getItem(correoLog));

    if (user=== null) {
        loginError.textContent="Usuario no encontrado";
        return;
    }
    if (user.contrasena1 !== contrasenaLog) {
        loginError.textContent="Contraseña Incorrecta";
        
        return;
    } else {
        alert("Haz hecho Inicio de Sesion")
    }
}
