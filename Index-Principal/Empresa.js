// Obtener referencias a los elementos del DOM
let contenedorEventos = document.getElementById("contenedorEventos");
let contenedorTareas = document.getElementById("contenedorTareas");

// Cargar eventos y tareas desde localStorage cuando se carga la página
cargarEventos();
cargarTareas();

// Evento para agregar un nuevo evento
document.getElementById('btnAgregarEvento').addEventListener('click', function() {
    // Obtener los valores de los campos de entrada
    let eventoInput = document.getElementById("evento").value;
    let fechaEventoInput = document.getElementById("fechaEvento").value;

    // Verificar que ambos campos no estén vacíos
    if (eventoInput !== "" && fechaEventoInput !== "") {
        // Crear un nuevo div para el evento
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

// Función para guardar un evento en localStorage
function guardarEvento(evento, fecha) {
    let eventos = JSON.parse(localStorage.getItem('eventos'));
    if (eventos === null) {
        eventos = [];
    }
    eventos.push({ evento: evento, fecha: fecha });
    localStorage.setItem('eventos', JSON.stringify(eventos));
}

// Función para cargar eventos desde localStorage
function cargarEventos() {
    let eventos = JSON.parse(localStorage.getItem('eventos'));
    if (eventos !== null) {
        for (let i = 0; i < eventos.length; i++) {
            let evento = eventos[i];

            // Crear un nuevo div para el evento
            let eventoDiv = document.createElement("div");
            eventoDiv.className = "evento";
            eventoDiv.textContent = "Evento: " + evento.evento + " - Fecha: " + evento.fecha;

            // Crear el botón de eliminar para el evento
            let btnEliminarEvento = document.createElement("button");
            btnEliminarEvento.textContent = "Eliminar";
            btnEliminarEvento.addEventListener('click', function() {
                eliminarEvento(evento.evento, evento.fecha, eventoDiv);
            });

            // Crear el botón de editar para el evento
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

// Función para eliminar un evento
function eliminarEvento(evento, fecha, eventoDiv) {
    let eventos = JSON.parse(localStorage.getItem('eventos'));
    if (eventos !== null) {
        eventos = eventos.filter(function(e) {
            return !(e.evento === evento && e.fecha === fecha);
        });
        localStorage.setItem('eventos', JSON.stringify(eventos));
        contenedorEventos.removeChild(eventoDiv);
    }
}

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

// Evento para agregar una nueva tarea
document.getElementById('btnAgregarTarea').addEventListener('click', function() {
    // Obtener los valores de los campos de entrada
    let tareaInput = document.getElementById("tarea").value;
    let prioridadesSeleccionadas = document.getElementById("prioridadTarea");
    let prioridades = [];

    // Obtener las prioridades seleccionadas
    for (let i = 0; i < prioridadesSeleccionadas.options.length; i++) {
        if (prioridadesSeleccionadas.options[i].selected) {
            prioridades.push(prioridadesSeleccionadas.options[i].value);
        }
    }

    // Verificar que la tarea no esté vacía y que al menos una prioridad esté seleccionada
    if (tareaInput !== "" && prioridades.length > 0) {
        // Crear un nuevo div para la tarea
        let tareaElemento = document.createElement("div");
        tareaElemento.className = "tarea";
        tareaElemento.textContent = "Tarea: " + tareaInput + " - Prioridades: " + prioridades.join(', ');

        // Crear el botón de eliminar para la tarea
        let btnEliminarTarea = document.createElement("button");
        btnEliminarTarea.textContent = "Eliminar";
        btnEliminarTarea.addEventListener('click', function() {
            eliminarTarea(tareaInput, prioridades, tareaElemento);
        });

        // Crear el botón de editar para la tarea
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
        for (let i = 0; i < prioridadesSeleccionadas.options.length; i++) {
            prioridadesSeleccionadas.options[i].selected = false;
        }
    } else {
        // Mostrar alerta si algún campo está vacío
        alert("Por favor, completa todos los campos de la tarea.");
    }
});

// Función para guardar una tarea en localStorage
function guardarTarea(tarea, prioridades) {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    if (tareas === null) {
        tareas = [];
    }
    tareas.push({ tarea: tarea, prioridades: prioridades });
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Función para cargar tareas desde localStorage
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

// Función para eliminar una tarea
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

// Función para editar una tarea
function editarTarea(tarea, prioridades, tareaElemento) {
    // Solicitar al usuario los nuevos valores para la tarea
    let nuevaTarea = prompt("Edita la tarea:", tarea);
    let nuevasPrioridades = prompt("Edita las prioridades de la tarea (separadas por coma):", prioridades.join(','));

    if (nuevaTarea !== null && nuevasPrioridades !== null) {
        nuevasPrioridades = nuevasPrioridades.split(',').map(p => p.trim());

        // Eliminar la tarea antigua
        eliminarTarea(tarea, prioridades, tareaElemento);

        // Guardar la tarea editada
        guardarTarea(nuevaTarea, nuevasPrioridades);

        // Crear un nuevo div para la tarea actualizada
        let nuevaTareaElemento = document.createElement("div");
        nuevaTareaElemento.className = "tarea";
        nuevaTareaElemento.textContent = "Tarea: " + nuevaTarea + " - Prioridades: " + nuevasPrioridades.join(', ');

        // Crear nuevamente los botones para la tarea editada
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
