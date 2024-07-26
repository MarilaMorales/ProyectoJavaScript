
document.getElementById("registroUsuarios").onsubmit = function (event) {
    event.preventDefault();
    registrarUsuario();
};

// Registramos el usuario guardando en un objeto User los datos
function registrarUsuario() {
   
    let usuario2 = document.getElementById("usuario1").value;
    let correo2 = document.getElementById("correo1").value;
    let contrasena2 = document.getElementById("contrasena1").value;

    if (localStorage.getItem(correo2)) {
        alert("El usuario se encuentra ya registrado");
        return;
    };

let user = {
    usuario1: usuario2,
    correo1: correo2,
    contrasena1: contrasena2
};
   
// console.log(user);

localStorage.setItem(correo2, JSON.stringify(user));   

alert("Usuario registrado correctamente.");
window.location.href = "../LogIn/LogIn.html";


}

