
document.getElementById('btnAgregarTareas').addEventListener('click', function() {
    let tarea = document.getElementById('tarea').value;
    let fecha = document.getElementById('fecha').value;
    if (tarea && fecha) {
        const tareaItem = document.createElement('div');
        tareaItem.textContent = `${tarea} - Fecha: ${fecha}`;
        document.getElementById('contenedorTareas').appendChild(tareaItem);
        document.getElementById('tarea').value = '';
        document.getElementById('fecha').value = '';
    } else {
        alert('Por favor, llene ambos campos');
    }
});

document.getElementById('btnAgregarEvento').addEventListener('click', function() {
    const evento = document.getElementById('evento').value;
    const prioridades = Array.from(document.getElementById('prioridad').selectedOptions).map(option => option.value);
    if (evento && prioridades.length > 0) {
        const eventoItem = document.createElement('div');
        eventoItem.textContent = `${evento} - Prioridades: ${prioridades.join(', ')}`;
        document.getElementById('contenedorEventos').appendChild(eventoItem);
        document.getElementById('evento').value = '';
        document.getElementById('prioridad').selectedIndex = -1;
    } else {
        alert('Por favor, llene el campo de evento y seleccione al menos una prioridad');
    }
});

