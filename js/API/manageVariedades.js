// Este código muestra los Cultivos y sus variedades en los SELECT ! de manera coherente

async function cargarCultivos() {
    try {
        const response = await fetch('http://localhost:5080/api/cultivos');

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API de cultivos');
        }

        const datos = await response.json();
        const selectCultivos = document.getElementById('select-cultivos');
        selectCultivos.innerHTML = `<option disabled selected value="">Seleccione un cultivo</option>`;

        const iconosCultivos = {
            'MANZANAS': '🍎',
            'KIWIS': '🥝',
            'CEREZOS': '🍒',
            'NUECES': '🌰',
            'ALFALFAS': '🌿'
        };

        datos.forEach(item => {
            const nombre = item.nombrecultivos;
            const icono = iconosCultivos[nombre.toUpperCase()] || '🌱';

            const option = document.createElement('option');
            option.value = nombre;
            option.textContent = `${icono} ${nombre}`;
            selectCultivos.appendChild(option);
        });

    } catch (error) {
        console.error('Error al cargar cultivos:', error);
    }
}

async function cargarVariedades(nombreCultivo) {
    try {
        console.log(`Cargando variedades para el cultivo: ${nombreCultivo}`);

        const response = await fetch(`http://localhost:5080/api/variedades/${encodeURIComponent(nombreCultivo)}`);

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API de variedades');
        }

        const datos = await response.json();
        const selectVariedades = document.getElementById('select-variedades');
        selectVariedades.innerHTML = `<option disabled selected>Seleccione una variedad</option>`;

        const iconoGenerico = '🌾'; // Icono único para todas las variedades

        datos.forEach(item => {
            const nombreVariedad = item.Nombre;

            const option = document.createElement('option');
            option.value = nombreVariedad;
            option.textContent = `${iconoGenerico} ${nombreVariedad}`;
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
