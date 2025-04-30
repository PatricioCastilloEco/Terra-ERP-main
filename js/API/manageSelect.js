async function cargarSelect(endpoint, selectId) {
    try {
        console.log(`Realizando solicitud a la API para: ${endpoint}...`);

        const response = await fetch(`http://localhost:5080/api/${endpoint}`);

        // Verificamos si la respuesta es correcta
        if (!response.ok) {
            console.error(`Error en la respuesta de la API: ${response.statusText}`);
            throw new Error('Error en la respuesta de la API');
        }

        const datos = await response.json();
        console.log(`Datos obtenidos de la API para ${endpoint}:`, datos);

        const select = document.getElementById(selectId);
        select.innerHTML = `<option disabled selected>Seleccione una opción</option>`; // Limpiar el select antes de cargar

        // Verificamos si los datos son un array de cadenas (clientes) o de objetos (cuarteles)
        if (Array.isArray(datos)) {
            const options = datos.map(item => {
                const option = document.createElement('option');
                if (typeof item === 'string') {
                    // Si es un cliente (cadena), lo agregamos directamente
                    option.value = item;
                    option.textContent = item;
                } else if (typeof item === 'object' && item.Nombre) {
                    // Si es un cuartel (objeto con 'Nombre')
                    option.value = item.Nombre;
                    option.textContent = item.Nombre;  // Aseguramos que se accede a 'Nombre' con la 'N' mayúscula
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
    cargarSelect('clientes', 'select-clientes'); // Llamamos a la función para cargar los clientes
    cargarSelect('cuarteles', 'select-cuarteles'); // Llamamos a la función para cargar los cuarteles
});
