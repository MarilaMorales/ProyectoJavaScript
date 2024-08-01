let contenedorEventos = document.getElementById("contenedorEventos");
let contenedorTareas = document.getElementById("contenedorTareas");


// Cargar eventos y tareas desde localStorage cuando se carga la página
cargarEventos();
cargarTareas();


                                // Agregar un nuevo evento
//--------------------------------------------------------------------------------------------


document.getElementById('btnAgregarEvento').addEventListener('click', function() { //Agrega un evento al botón "Agregar Evento" para recoger los valores de entrada.
    
    let eventoInput = document.getElementById("evento").value;// Obtener los valores de los campos de entrada
    let fechaEventoInput = document.getElementById("fechaEvento").value;



    if (eventoInput !== "" && fechaEventoInput !== "") {

        // Se cargan los eventos desde el Local para validarlas
        let eventosGuardados= JSON.parse(localStorage.getItem("eventos")); 

        if (eventosGuardados === null) {
            eventosGuardados = [];

        }

        // Validar si el evento ya está registrado
        let eventoExiste = false;
        for (let  i= 0; i < eventosGuardados.length; i++) {
            if (eventosGuardados[i].evento === eventoInput) {
                eventoExiste = true;
                alert("Ya hay un evento con ese nombre");
                return;
            }
        }


        // Crear un nuevo div para los datos 
        let eventoDiv = document.createElement("div");
        eventoDiv.className = "evento";
        eventoDiv.innerHTML = "Evento: " + eventoInput + " - Fecha: " + fechaEventoInput;

        // Crear el botón de eliminar para el evento
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener('click', function() {
            eliminarEvento(eventoInput, fechaEventoInput, eventoDiv);
        });

        // Crear el botón de editar para el evento
        let btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener('click', function() {
            editarEvento(eventoInput, fechaEventoInput, eventoDiv);
        });

        // Agregar los botones al div del evento
        eventoDiv.appendChild(btnEliminar);
        eventoDiv.appendChild(btnEditar);

        // Agregar el div del evento al contenedor de eventos
        contenedorEventos.appendChild(eventoDiv);

        // Guardar el evento en localStorage
        guardarEvento(eventoInput, fechaEventoInput);

        // Limpiar los campos de entrada
        document.getElementById("evento").value = "";
        document.getElementById("fechaEvento").value = "";
        
    } else {

        // Mostrar alerta si algún campo está vacío
        alert("Por favor, completa todos los campos del evento.");
    }
});



// -------------------------------- Guardar un Evento en LocalStorage-------------------


// Función para guardar un evento en localStorage
function guardarEvento(evento, fecha) {
    let eventos = JSON.parse(localStorage.getItem('eventos'));
    if (eventos === null) {
        eventos = [];
    }
    eventos.push({ evento: evento, fecha: fecha });
    localStorage.setItem('eventos', JSON.stringify(eventos));
}




// -----------------------------Cargar Eventos desde LocalStorage------------------------

// Función para cargar eventos desde localStorage


function cargarEventos() {
    let eventos = JSON.parse(localStorage.getItem('eventos'));
    if (eventos !== null) {
        for (let i = 0; i < eventos.length; i++) {
            let evento = eventos[i];

            // Crear un nuevo div para el evento
            let eventoDiv = document.createElement("div");
            eventoDiv.className = "evento";
            eventoDiv.textContent = "Evento: " + evento.evento + " " + " // Fecha: " + evento.fecha + " ";

            // Crear el botón de eliminar y editar 
            let btnEliminarEvento = document.createElement("button");
            btnEliminarEvento.textContent = "Eliminar";
            btnEliminarEvento.addEventListener('click', function() {
                eliminarEvento(evento.evento, evento.fecha, eventoDiv);
            });

            
            let btnEditarEvento = document.createElement("button");
            btnEditarEvento.textContent = "Editar";
            btnEditarEvento.addEventListener('click', function() {
                editarEvento(evento.evento, evento.fecha, eventoDiv);
            });

            // Agregar los botones al div del evento
            eventoDiv.appendChild(btnEliminarEvento);
            eventoDiv.appendChild(btnEditarEvento);

            // Agregar el div del evento al contenedor de eventos
            contenedorEventos.appendChild(eventoDiv);
        }
    }
}


//------------------------------- Funcion para Eliminar Evento-----------------------------


// Función para eliminar un evento
function eliminarEvento(evento, fecha, eventoDiv) {
    let eventos = JSON.parse(localStorage.getItem('eventos'));
    if (eventos !== null) {
        eventos = eventos.filter(function(eventoActual) {
            return !(eventoActual.evento === evento && eventoActual.fecha === fecha);
        });
        localStorage.setItem('eventos', JSON.stringify(eventos));
        contenedorEventos.removeChild(eventoDiv);
    }
}



//---------------------------------- Editar un Evento--------------------------------------


// Función para editar un evento
function editarEvento(evento, fecha, eventoDiv) {
    let nuevoEvento = prompt("Edita el evento:", evento);
    let nuevaFecha = prompt("Edita la fecha del evento:", fecha);

    if (nuevoEvento !== null && nuevaFecha !== null) {
        // Eliminar el evento antiguo
        eliminarEvento(evento, fecha, eventoDiv);

        // Guardar el evento editado
        guardarEvento(nuevoEvento, nuevaFecha);

        // Crear un nuevo div para el evento actualizado
        let nuevoEventoDiv = document.createElement("div");
        nuevoEventoDiv.className = "evento";
        nuevoEventoDiv.textContent = "Evento: " + nuevoEvento + " - Fecha: " + nuevaFecha;

        // Crear nuevamente los botones para el evento editado
        let btnEliminarEvento = document.createElement("button");
        btnEliminarEvento.textContent = "Eliminar";
        btnEliminarEvento.addEventListener('click', function() {
            eliminarEvento(nuevoEvento, nuevaFecha, nuevoEventoDiv);

        });

        let btnEditarEvento = document.createElement("button");
        btnEditarEvento.textContent = "Editar";
        btnEditarEvento.addEventListener('click', function() {
            editarEvento(nuevoEvento, nuevaFecha, nuevoEventoDiv);
        });

        // Agregar los botones al div del evento
        nuevoEventoDiv.appendChild(btnEliminarEvento);
        nuevoEventoDiv.appendChild(btnEditarEvento);

        // Agregar el div del evento actualizado al contenedor de eventos
        contenedorEventos.appendChild(nuevoEventoDiv);
    }
}


cargarTareas();
//------------------------------------ Funcion de Agregar Tareas-------------------------------------------



document.getElementById('btnAgregarTarea').addEventListener('click', function() {
    // Obtener los valores de los campos de entrada
    let tareaInput = document.getElementById("tarea").value;
    let prioridadesSelect = document.getElementById("prioridadTarea");
    let prioridades = [];



    // Obtener las prioridades seleccionadas, este buble, recorre todas las opciones y guarda la seleccioda en Prioridades
    for (let i = 0; i < prioridadesSelect.options.length; i++) {
        if (prioridadesSelect.options[i].selected) {
            prioridades.push(prioridadesSelect.options[i].value);
        }
    }


    // Verificar que la tarea no esté vacía y que al menos una prioridad esté seleccionada
    if (tareaInput !== "" && prioridades.length > 0) {

        
        // Se cargan las tareas desde el Local para validarlas
        let tareasGuardadas= JSON.parse(localStorage.getItem("tareas"));
  
        
        if (tareasGuardadas === null) {
            tareasGuardadas = [];
        }

        // Ver si la tarea ya está registrada
        let tareaExistente = false;
        for (let  i= 0; i < tareasGuardadas.length; i++) {
            if (tareasGuardadas[i].tarea === tareaInput) {
                tareaExistente = true;
                alert("La tarea ya está registrada");
                return;
            }
        }


        // Crear un nuevo div para la tarea
        let tareaElemento = document.createElement("div");
        tareaElemento.className = "tarea";
        tareaElemento.textContent = "Tarea: " + tareaInput + " - Prioridades: " + prioridades.join(', ');


        // Crear el botón de eliminar y el de editar la tarea
        let btnEliminarTarea = document.createElement("button");
        btnEliminarTarea.textContent = "Eliminar";
        btnEliminarTarea.addEventListener('click', function() {
            eliminarTarea(tareaInput, prioridades, tareaElemento);
        });

        let btnEditarTarea = document.createElement("button");
        btnEditarTarea.textContent = "Editar";
        btnEditarTarea.addEventListener('click', function() {
            editarTarea(tareaInput, prioridades, tareaElemento);
        });

        // Agregar los botones al div de la tarea
        tareaElemento.appendChild(btnEliminarTarea);
        tareaElemento.appendChild(btnEditarTarea);

        // Agregar el div de la tarea al contenedor de tareas
        contenedorTareas.appendChild(tareaElemento);

        // Guardar la tarea en localStorage
        guardarTarea(tareaInput, prioridades);

        // Limpiar los campos de entrada
        document.getElementById("tarea").value = "";
        for (let i = 0; i < prioridadesSelect.options.length; i++) {
            prioridadesSelect.options[i].selected = false;
        }
    } else {
        
        alert("Por favor, completa todos los campos de la tarea.");
    }
});


//------------------------------- Funcion para Guardar Tarea en Local------------------------


function guardarTarea(tarea, prioridades) {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    if (tareas === null) {
        tareas = [];
    }
    tareas.push({ tarea: tarea, prioridades: prioridades });
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

//------------------------------- Funcion para Cargar Tarea en Local------------------------

function cargarTareas() {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    if (tareas !== null) {
        for (let i = 0; i < tareas.length; i++) {
            let tarea = tareas[i];

            // Crear un nuevo div para la tarea
            let tareaElemento = document.createElement("div");
            tareaElemento.className = "tarea";
            tareaElemento.textContent = "Tarea: " + tarea.tarea + " - Prioridades: " + tarea.prioridades.join(', ');

            // Crear el botón de eliminar para la tarea
            let btnEliminarTarea = document.createElement("button");
            btnEliminarTarea.textContent = "Eliminar";
            btnEliminarTarea.addEventListener('click', function() {
                eliminarTarea(tarea.tarea, tarea.prioridades, tareaElemento);
            });

            // Crear el botón de editar para la tarea
            let btnEditarTarea = document.createElement("button");
            btnEditarTarea.textContent = "Editar";
            btnEditarTarea.addEventListener('click', function() {
                editarTarea(tarea.tarea, tarea.prioridades, tareaElemento);
            });

            // Agregar los botones al div de la tarea
            tareaElemento.appendChild(btnEliminarTarea);
            tareaElemento.appendChild(btnEditarTarea);

            // Agregar el div de la tarea al contenedor de tareas
            contenedorTareas.appendChild(tareaElemento);
        }
    }
}

//------------------------------- Funcion para Eliminar Tarea------------------------


function eliminarTarea(tarea, prioridades, tareaElemento) {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    if (tareas !== null) {
        tareas = tareas.filter(function(t) {
            return !(t.tarea === tarea && JSON.stringify(t.prioridades) === JSON.stringify(prioridades));
        });
        localStorage.setItem('tareas', JSON.stringify(tareas));
        contenedorTareas.removeChild(tareaElemento);
    }
}


//------------------------------- Funcion para Editar Tarea------------------------


function editarTarea(tarea, prioridades, tareaElemento) {

    // Solicitar al usuario los nuevos valores para la tarea
    let nuevaTarea = prompt("Edita la tarea:", tarea);
    let nuevasPrioridadesTemp = prompt("Edita las prioridades de la tarea (separadas por coma):", prioridades.join(','));

        
    if (nuevaTarea !== null && nuevasPrioridadesTemp !== null) {
        let nuevasPrioridades = nuevasPrioridadesTemp.split(',');

        // Limpiar espacios en blanco alrededor de cada prioridad
        for (let i = 0; i < nuevasPrioridades.length; i++) {
            nuevasPrioridades[i] = nuevasPrioridades[i].trim();
        }
        
        // Eliminar la tarea antigua
        eliminarTarea(tarea, prioridades, tareaElemento);

        // Guardar la tarea editada
        guardarTarea(nuevaTarea, nuevasPrioridades);

        // Crear un nuevo div para la tarea actualizada
        let nuevaTareaElemento = document.createElement("div");
        nuevaTareaElemento.className = "tarea";
        nuevaTareaElemento.textContent = "Tarea: " + nuevaTarea + " - Prioridades: " + nuevasPrioridades.join(', ');

        // Crear nuevamente los botones para la tarea editada.
        let btnEliminarTarea = document.createElement("button");
        btnEliminarTarea.textContent = "Eliminar";
        btnEliminarTarea.addEventListener('click', function() {
            eliminarTarea(nuevaTarea, nuevasPrioridades, nuevaTareaElemento);
        });

        let btnEditarTarea = document.createElement("button");
        btnEditarTarea.textContent = "Editar";
        btnEditarTarea.addEventListener('click', function() {
            editarTarea(nuevaTarea, nuevasPrioridades, nuevaTareaElemento);
        });

        // Agregar los botones al div de la tarea
        nuevaTareaElemento.appendChild(btnEliminarTarea);
        nuevaTareaElemento.appendChild(btnEditarTarea);

        // Agregar el div de la tarea actualizada al contenedor de tareas
        contenedorTareas.appendChild(nuevaTareaElemento);
    }
}
