document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia a la tabla, al botón y a los select
    var tabla = document.getElementById('tabla-despacho').getElementsByTagName('tbody')[0];
    var btnFiltrar = document.getElementById('btnFiltrar');
    
    // Obtener los elementos select
    var selectClientes = document.getElementById('select-clientes');
    var selectCultivos = document.getElementById('select-cultivos');
    var selectVariedades = document.getElementById('select-variedades');
    var selectCuarteles = document.getElementById('select-cuarteles');
    var selectGuia = document.querySelector('[name="guia"]');

    // Función para cargar el modal desde el archivo externo
    function cargarModal() {
        fetch('../../views/modals/modals.html')  // Ruta del modal HTML
            .then(response => response.text())
            .then(data => {
                // Insertar el contenido del modal en el DOM
                document.body.insertAdjacentHTML('beforeend', data);

                // Asegurarse de que el modal esté completamente cargado en el DOM
                var modalAlertaElement = document.getElementById('modalAlerta');

                if (modalAlertaElement) {
                    var modalAlerta = new bootstrap.Modal(modalAlertaElement);

                    // Función para actualizar la tabla
                    function actualizarTabla() {
                        // Verificar si los select tienen un valor seleccionado
                        if (selectClientes.value === "" || selectCultivos.value === "" || selectVariedades.value === "" || selectCuarteles.value === "" || selectGuia.value === "") {
                            modalAlerta.show();
                            return;
                        }

                        // Limpiar la tabla antes de agregar nuevos datos
                        tabla.innerHTML = '';

                        // Realizar la llamada al API para obtener los datos
                        fetch('http://localhost:5080/api/despachos/resumen')
                            .then(response => response.json())
                            .then(data => {
                                // Verificar si se recibieron datos
                                if (Array.isArray(data) && data.length > 0) {
                                    // Agregar filas con los nuevos datos del API
                                    data.forEach(function(item) {
                                        var row = tabla.insertRow();

                                        row.insertCell(0).textContent = item["ID Cliente"];
                                        row.insertCell(1).textContent = item["RazonSocial"];
                                        row.insertCell(2).textContent = item["Fecha"];
                                        row.insertCell(3).textContent = item["Variedad"];
                                        row.insertCell(4).textContent = item["Cuartel"];
                                        row.insertCell(5).textContent = item["Guía"];
                                        row.insertCell(6).textContent = item["BINS"];
                                        row.insertCell(7).textContent = item["KG Según guía"];

                                        var estadoCell = row.insertCell(8);
                                        estadoCell.textContent = item["Estado"] || '';

                                        estadoCell.addEventListener('click', function() {
                                            if (estadoCell.textContent === '') {
                                                var inputEstado = document.createElement('input');
                                                inputEstado.type = 'number';
                                                inputEstado.value = '';
                                                inputEstado.classList.add('fade-in');
                                                estadoCell.innerHTML = '';
                                                estadoCell.appendChild(inputEstado);
                                                inputEstado.focus();

                                                inputEstado.addEventListener('blur', function() {
                                                    item.estado = inputEstado.value.trim();
                                                    estadoCell.textContent = item.estado || '';
                                                });

                                                inputEstado.addEventListener('keydown', function(event) {
                                                    if (event.key === 'Enter') {
                                                        inputEstado.blur();
                                                    }
                                                });
                                            }
                                        });

                                        var estadoPendienteCell = row.insertCell(9);
                                        estadoPendienteCell.innerHTML = `<span class="badge bg-warning">Pendiente</span>`;

                                        var accionesCell = row.insertCell(10);
                                        accionesCell.innerHTML = `
                                                <div class="btn-group" role="group">
                                                    <button class="btn btn-outline-primary btn-sm" onclick="verDespacho(${item['ID Cliente']})" title="Ver">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                    <button class="btn btn-outline-success btn-sm" onclick="editarDespacho(${item['ID Cliente']})" title="Editar">
                                                        <i class="fas fa-pen-to-square"></i>
                                                    </button>
                                                    <button class="btn btn-outline-danger btn-sm" onclick="eliminarDespacho(${item['ID Cliente']})" title="Eliminar">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>

                                        `;
                                    });
                                } else {
                                    // Si no hay datos, mostrar mensaje "No hay registros"
                                    var row = tabla.insertRow();
                                    var cell = row.insertCell(0);
                                    cell.colSpan = 11;  // Número total de columnas
                                    cell.classList.add('text-center', 'text-muted');
                                    cell.textContent = 'No hay registros que coincidan con los filtros.';
                                }
                            })
                            .catch(error => {
                                console.error('Error al cargar los datos del API:', error);
                            });
                    }

                    btnFiltrar.addEventListener('click', actualizarTabla);

                    var modalCerrarBtn = modalAlertaElement.querySelector('.btn-close');
                    modalCerrarBtn.addEventListener('click', function() {
                        modalAlerta.hide();
                    });

                    modalAlertaElement.addEventListener('click', function(event) {
                        if (event.target === modalAlertaElement) {
                            modalAlerta.hide();
                        }
                    });
                } else {
                    console.error('El modal no se ha cargado correctamente');
                }
            })
            .catch(error => {
                console.error('Error al cargar el modal:', error);
            });
    }

    cargarModal();
});

// Funciones para las acciones
function verDespacho(id) {
    console.log("Ver despacho con ID:", id);
}

function editarDespacho(id) {
    console.log("Editar despacho con ID:", id);
}

function eliminarDespacho(id) {
    console.log("Eliminar despacho con ID:", id);
}
