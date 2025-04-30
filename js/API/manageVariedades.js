async function cargarCultivos() {
    try {
        const response = await fetch('http://localhost:5080/api/cultivos');

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API de cultivos');
        }

        const datos = await response.json();
        const selectCultivos = document.getElementById('select-cultivos');
        selectCultivos.innerHTML = `<option disabled selected>Seleccione un cultivo</option>`;

        datos.forEach(item => {
            const option = document.createElement('option');
            option.value = item.nombrecultivos;
            option.textContent = item.nombrecultivos;
            selectCultivos.appendChild(option);
        });

    } catch (error) {
        console.error('Error al cargar cultivos:', error);
    }
}

async function cargarVariedades(nombreCultivo) {
    try {
        console.log(`Cargando variedades para el cultivo: ${nombreCultivo}`);

        // ⚠️ Si tu endpoint real es con query param, usa esta línea en vez de la de abajo:
        // const response = await fetch(`http://localhost:5080/api/variedades?cultivo=${encodeURIComponent(nombreCultivo)}`);

        const response = await fetch(`http://localhost:5080/api/variedades/${encodeURIComponent(nombreCultivo)}`);

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API de variedades');
        }

        const datos = await response.json();
        const selectVariedades = document.getElementById('select-variedades');
        selectVariedades.innerHTML = `<option disabled selected>Seleccione una variedad</option>`;

        datos.forEach(item => {
            const option = document.createElement('option');
            option.value = item.Nombre;
            option.textContent = item.Nombre;
            selectVariedades.appendChild(option);
        });

    } catch (error) {
        console.error('Error al cargar variedades:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCultivos();

    const selectCultivos = document.getElementById('select-cultivos');
    selectCultivos.addEventListener('change', (event) => {
        const cultivoSeleccionado = event.target.value;
        cargarVariedades(cultivoSeleccionado);
    });
});
