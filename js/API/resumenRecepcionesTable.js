document.addEventListener('DOMContentLoaded', function () {
    const iconosCultivos = {
        'MANZANAS': '🍎',
        'KIWIS': '🥝',
        'CEREZOS': '🍒',
        'NUECES': '🌰',
        'ALFALFA': '🌿'
    };

    const tabla = document.getElementById('tabla-recepciones').getElementsByTagName('tbody')[0];
    const detalleDespacho = document.getElementById('resumen-recepciones');
    const sinDatos = document.getElementById('sin-datos');

    function cargarDespachos() {
        fetch('http://localhost:5080/api/resumenDespachos')
            .then(response => response.json())
            .then(data => {
                tabla.innerHTML = ''; // Limpiar la tabla

                if (Array.isArray(data) && data.length > 0) {
                    detalleDespacho.classList.remove('d-none');
                    sinDatos.classList.add('d-none');

                    data.forEach(function (item, index) {
                        const row = tabla.insertRow();

                        row.insertCell(0).textContent = index + 1; // ID (contador)
                        row.insertCell(1).textContent = item["Cliente"];
                        row.insertCell(2).textContent = item["Fecha_Despacho"];

                        // Agregar ícono a la variedad
                        const variedad = item["Variedad"] || '';
                        const icono = iconosCultivos[variedad.toUpperCase()] || '';
                        row.insertCell(3).textContent = `${icono} ${variedad}`;

                        row.insertCell(4).textContent = item["Cuartel"];
                        row.insertCell(5).textContent = item["Numero_Guia"];
                        row.insertCell(6).textContent = item["BINS"];
                        row.insertCell(7).textContent = item["Kgsegundia"];
                        row.insertCell(8).textContent = item["Kg_recepcionados"];

                        // Acciones
                        const accionesCell = row.insertCell(9);
                        accionesCell.innerHTML = `
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-primary" title="Ver"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-sm btn-outline-success" title="Editar"><i class="fas fa-pen-to-square"></i></button>
                                <button class="btn btn-sm btn-outline-danger" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        `;
                    });
                } else {
                    detalleDespacho.classList.remove('d-none');
                    sinDatos.classList.remove('d-none');
                }
            })
            .catch(error => {
                console.error('Error al cargar los datos del API:', error);
                detalleDespacho.classList.remove('d-none');
                sinDatos.classList.remove('d-none');
            });
    }

    // Ejecutar inmediatamente al cargar la página
    cargarDespachos();
});
