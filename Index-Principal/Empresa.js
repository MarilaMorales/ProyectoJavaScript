  
document.addEventListener("DOMContentLoaded", function() {
    
    function agregarEvento() { // Función para agregar un evento
       
        let eventoInput = document.getElementById("evento").value; // Se obtiene el valor de evento y fecha
        let fechaEventoInput = document.getElementById("fechaEvento").value;
        let contenedorEventos = document.getElementById("contenedorEventos"); // Div padre donde se mostraran 

        
        if (eventoInput && fechaEventoInput) { // Verifica que ambos campos tengan valores
            
            let eventoDiv = document.createElement("div");
            eventoDiv.className = "evento";  // Crea un nuevo elemento div para el evento y le crea una clase llamada evento
            eventoDiv.textContent = "Evento: " + eventoInput + " - Fecha: " + fechaEventoInput; // IMPORTANTE aqui  le da el nuevo contenido al Div hijo
            contenedorEventos.appendChild(eventoDiv); //Añada el Div hijo al Div Padre.
            console.log(eventoInput, fechaEventoInput);

            // Limpia los campos de entrada
            document.getElementById("evento").value = "";
            document.getElementById("fechaEvento").value = "";
            console.log(evento, fechaEvento);
        } else {
            // Muestra una alerta si algún campo está vacío
            alert("Por favor, completa todos los campos del evento.");
        }
    }

    // Función para agregar una tarea
    function agregarTarea() {
        
        let tareaInput = document.getElementById('tarea').value;// Obtiene el valor del input de tarea
        let prioridadesSeleccionadas = Array.from(document.getElementById('prioridadTarea').selectedOptions).map(function(option) {   // Obtiene las opciones seleccionadas del select de prioridades
            return option.value;
        });
        
        let contenedorTareas = document.getElementById('contenedorTareas');// Obtiene el contenedor donde se mostrarán las tareas

        // Verifica que la tarea tenga un valor y que al menos una prioridad esté seleccionada
        if (tareaInput && prioridadesSeleccionadas.length > 0) {
            // Crea un nuevo elemento div para la tarea
            let tareaElemento = document.createElement('div');
            // Asigna una clase al nuevo div
            tareaElemento.className = 'tarea';
            // Establece el contenido de texto del nuevo div
            tareaElemento.textContent = 'Tarea: ' + tareaInput + ' - Prioridades: ' + prioridadesSeleccionadas.join(', ');
            // Añade el nuevo div al contenedor de tareas
            contenedorTareas.appendChild(tareaElemento);

            // Limpia el campo de entrada y deselecciona las opciones del select
            document.getElementById('tarea').value = '';
            document.getElementById('prioridadTarea').selectedIndex = -1;
        } else {
            // Muestra una alerta si algún campo está vacío
            alert('Por favor, completa todos los campos de la tarea.');
        }
    }

    // Asigna la función agregarEvento al botón de agregar evento
    document.getElementById('btnAgregarEvento').addEventListener('click', agregarEvento);
    // Asigna la función agregarTarea al botón de agregar tarea
    document.getElementById('btnAgregarTarea').addEventListener('click', agregarTarea);
});




