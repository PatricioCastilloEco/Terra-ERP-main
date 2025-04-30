async function cargarSelectCuarteles() {
    try {
        console.log('Realizando solicitud a la API de cuarteles...');
        
        // Cambia la URL al endpoint correcto de tu API
        const response = await fetch('http://localhost:5080/api/cuarteles');
        
        // Asegúrate de que la respuesta es correcta antes de continuar
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API: ' + response.statusText);
        }

        // Obtenemos los datos de los cuarteles (un array de objetos con la propiedad 'Nombre')
        const cuarteles = await response.json();
        console.log('Cuarteles obtenidos:', cuarteles); // Verifica la estructura de los datos

        const select = document.getElementById('select-cuarteles');

        // Limpia el contenido previo del select y coloca el primer option
        select.innerHTML = '<option disabled selected>Seleccione un cuartel</option>';

        // Verifica que el array de cuarteles no esté vacío
        if (cuarteles.length === 0) {
            console.warn('No se encontraron cuarteles.');
        }

        // Itera sobre los cuarteles y agrega las opciones al select
        cuarteles.forEach((cuartel, index) => {
            console.log('Agregando cuartel:', cuartel.Nombre); // Muestra el nombre de cada cuartel que se agrega al select
            const option = document.createElement('option');
            option.value = index + 1;  // Usamos el índice como valor del option (puedes cambiar esto si necesitas otro valor)
            option.textContent = cuartel.Nombre;  // Usamos el nombre del cuartel como texto visible
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar cuarteles:', error);
    }
}

// Llamamos a la función para cargar los cuarteles cuando el documento esté listo
document.addEventListener('DOMContentLoaded', cargarSelectCuarteles);
