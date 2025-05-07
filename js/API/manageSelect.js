// Este código muestra los Clientes, Cuarteles, Guia y temporadas en los SELECT ! de manera coherente

async function cargarSelect(endpoint, selectId) {
    try {
        console.log(`Realizando solicitud a la API para: ${endpoint}...`);

        const response = await fetch(`http://localhost:5080/api/${endpoint}`);

        if (!response.ok) {
            console.error(`Error en la respuesta de la API: ${response.statusText}`);
            throw new Error('Error en la respuesta de la API');
        }

        const datos = await response.json();
        console.log(`Datos obtenidos de la API para ${endpoint}:`, datos);

        const select = document.getElementById(selectId);
        select.innerHTML = `<option disabled selected>Seleccione una opción</option>`;

        if (Array.isArray(datos)) {
            const options = datos.map(item => {
                const option = document.createElement('option');

                if (typeof item === 'string') {
                    option.value = item;
                    option.textContent = `👤 ${item}`;
                } else if (typeof item === 'object') {
                    if (item.Nombre) {
                        option.value = item.Nombre;
                        option.textContent = `🏞 ${item.Nombre}`;
                    } else if (item.NumeroGuia) {
                        option.value = item.NumeroGuia;
                        option.textContent = `📦 ${item.NumeroGuia}`;
                    } else if (item.Fecha_inicio && item.Fecha_fin) {
                        // Temporada
                        option.value = `${item.Fecha_inicio} - ${item.Fecha_fin}`;
                        option.textContent = `📅 ${item.Fecha_inicio} → ${item.Fecha_fin}`;
                    }
                }

                return option;
            });

            select.append(...options);
        } else {
            console.error('Los datos no son un array esperado', datos);
        }

    } catch (error) {
        console.error(`Error al cargar ${endpoint}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarSelect('clientes', 'select-clientes');
    cargarSelect('cuarteles', 'select-cuarteles');
    cargarSelect('numeroGua', 'select-guia');
    cargarSelect('temporadas', 'select-temporadas'); // 👈 Añadido aquí
});
