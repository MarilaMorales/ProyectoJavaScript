document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencias a los elementos del DOM
    let contenedorEventos = document.getElementById("contenedorEventos");
    let contenedorTareas = document.getElementById("contenedorTareas");

    // Cargar eventos y tareas desde localStorage
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
            eventoDiv.textContent = "Evento: " + eventoInput + " - Fecha: " + fechaEventoInput;
            
            contenedorEventos.appendChild(eventoDiv);



            



            // Guardar el evento en localStorage
            guardarEvento(eventoInput, fechaEventoInput);

            // Limpiar los campos de entrada
            document.getElementById("evento").value = "";
            document.getElementById("fechaEvento").value = "";
        } else {
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
            for (var i = 0; i < eventos.length; i++) {
                var evento = eventos[i];
                var eventoDiv = document.createElement("div");
                eventoDiv.className = "evento";
                eventoDiv.textContent = "Evento: " + evento.evento + " - Fecha: " + evento.fecha;
                contenedorEventos.appendChild(eventoDiv);
            }
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
            contenedorTareas.appendChild(tareaElemento);

            // Guardar la tarea en localStorage
            guardarTarea(tareaInput, prioridades);

            // Limpiar los campos de entrada
            document.getElementById("tarea").value = "";
            for (var i = 0; i < prioridadesSeleccionadas.options.length; i++) {
                prioridadesSeleccionadas.options[i].selected = false;
            }
        } else {
            alert("Por favor, completa todos los campos de la tarea.");
        }
    });

    // Función para guardar una tarea en localStorage
    function guardarTarea(tarea, prioridades) {
        let tareas = JSON.parse(localStorage.getItem('tareas'));
        if (tareas === null) {
            tareas = [];
        }
        tareas.push({ tarea: tarea, prioridades: prioridades });
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    // Función para cargar tareas desde localStorage
    function cargarTareas() {
        let tareas = JSON.parse(localStorage.getItem('tareas'));
        if (tareas !== null) {
            for (var i = 0; i < tareas.length; i++) {
                let tarea = tareas[i];
                let tareaElemento = document.createElement("div");
                tareaElemento.className = "tarea";
                tareaElemento.textContent = "Tarea: " + tarea.tarea + " - Prioridades: " + tarea.prioridades.join(', ');
                contenedorTareas.appendChild(tareaElemento);
            }
        }
    }
});



