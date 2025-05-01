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
    
    // Datos de ejemplo (pueden ser reemplazados por datos reales)
    var nuevosDatos = [
      { id: 1, cliente: "Juan Pérez", fecha: "2025-04-25", variedad: "Variedad A", cuartel: "Cuartel 1", guia: "Guía 123", bins: "Bin 1", kg_guia: 200, estado: "" },
      { id: 2, cliente: "Ana López", fecha: "2025-04-26", variedad: "Variedad B", cuartel: "Cuartel 2", guia: "Guía 124", bins: "Bin 2", kg_guia: 150, estado: "Inactivo" },
      { id: 3, cliente: "Carlos Díaz", fecha: "2025-04-27", variedad: "Variedad C", cuartel: "Cuartel 3", guia: "Guía 125", bins: "Bin 3", kg_guia: 300, estado: "Activo" }
    ];

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
                    // Crear la instancia del modal después de que se haya insertado en el DOM
                    var modalAlerta = new bootstrap.Modal(modalAlertaElement);

                    // Función para actualizar la tabla
                    function actualizarTabla() {
                        // Verificar si los select tienen un valor seleccionado
                        if (selectClientes.value === "" || selectCultivos.value === "" || selectVariedades.value === "" || selectCuarteles.value === "" || selectGuia.value === "") {
                            // Mostrar el modal si hay algún filtro vacío
                            modalAlerta.show();
                            return; // No ejecutar la actualización si hay algún select vacío
                        }

                        // Limpiar la tabla antes de agregar nuevos datos
                        tabla.innerHTML = '';

                        // Agregar filas con los nuevos datos
                        nuevosDatos.forEach(function(item) {
                            var row = tabla.insertRow(); // Crea una nueva fila

                            // Crear celdas y agregarlas a la fila
                            row.insertCell(0).textContent = item.id;
                            row.insertCell(1).textContent = item.cliente;
                            row.insertCell(2).textContent = item.fecha;
                            row.insertCell(3).textContent = item.variedad;
                            row.insertCell(4).textContent = item.cuartel;
                            row.insertCell(5).textContent = item.guia;
                            row.insertCell(6).textContent = item.bins;
                            row.insertCell(7).textContent = item.kg_guia;

                            // Crea la celda de estado con valor vacío inicialmente
                            var estadoCell = row.insertCell(8);
                            estadoCell.textContent = item.estado || ''; // Inicialmente vacío

                            // Evento para hacer editable la celda al hacer clic
                            estadoCell.addEventListener('click', function() {
                                if (estadoCell.textContent === '') {
                                    var inputEstado = document.createElement('input');
                                    inputEstado.type = 'text';
                                    inputEstado.value = '';  // Inicialmente vacío

                                    // Reemplazar el contenido de la celda con el input
                                    estadoCell.innerHTML = '';
                                    estadoCell.appendChild(inputEstado);
                                    inputEstado.focus();

                                    // Guardar el valor cuando se presiona Enter o se pierde el foco
                                    inputEstado.addEventListener('blur', function() {
                                        item.estado = inputEstado.value;  // Guardar el valor editado
                                        estadoCell.textContent = item.estado || 'Pendiente';  // Actualizar la celda
                                    });

                                    inputEstado.addEventListener('keydown', function(event) {
                                        if (event.key === 'Enter') {
                                            inputEstado.blur();  // Guardar el valor cuando se presiona Enter
                                        }
                                    });
                                }
                            });

                            // Celda de estado pendiente
                            var estadoPendienteCell = row.insertCell(9);
                            estadoPendienteCell.innerHTML = `<span class="badge bg-warning">Pendiente</span>`;

                            // Celda de acciones con botones
                            var accionesCell = row.insertCell(10);
                            accionesCell.innerHTML = `
                                <button class="btn btn-sm btn-info" onclick="verDespacho(${item.id})">
                                    <i class="fas fa-eye"></i> Ver
                                </button>
                                <button class="btn btn-sm btn-warning" onclick="editarDespacho(${item.id})">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="eliminarDespacho(${item.id})">
                                    <i class="fas fa-trash"></i> Eliminar
                                </button>
                            `;
                        });
                    }

                    // Agregar el evento al botón para actualizar la tabla
                    btnFiltrar.addEventListener('click', actualizarTabla);

                    // Evento para cerrar el modal correctamente
                    var modalCerrarBtn = modalAlertaElement.querySelector('.btn-close');
                    modalCerrarBtn.addEventListener('click', function() {
                        modalAlerta.hide();  // Cerrar el modal
                    });

                    // También cerrar el modal si el usuario hace clic fuera del modal
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

    // Llamar a la función para cargar el modal
    cargarModal();
});

// Funciones para las acciones (puedes adaptarlas a lo que necesites)
function verDespacho(id) {
    console.log("Ver despacho con ID:", id);
    // Lógica para ver el despacho
}

function editarDespacho(id) {
    console.log("Editar despacho con ID:", id);
    // Lógica para editar el despacho
}

function eliminarDespacho(id) {
    console.log("Eliminar despacho con ID:", id);
    // Lógica para eliminar el despacho
}
