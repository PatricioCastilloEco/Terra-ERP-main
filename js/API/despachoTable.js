document.addEventListener('DOMContentLoaded', function() {
    var tabla = document.getElementById('tabla-despacho').getElementsByTagName('tbody')[0];
    var btnFiltrar = document.getElementById('btnFiltrar');

    var selectClientes = document.getElementById('select-clientes');
    var selectCultivos = document.getElementById('select-cultivos');
    var selectVariedades = document.getElementById('select-variedades');
    var selectCuarteles = document.getElementById('select-cuarteles');
    var selectGuia = document.getElementById('select-guia');

    btnFiltrar.disabled = true;

    let modalAlerta = null;

    function cargarModal() {
        return fetch('../../views/modals/modals.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);
                var modalAlertaElement = document.getElementById('modalAlerta');
                if (modalAlertaElement) {
                    modalAlerta = new bootstrap.Modal(modalAlertaElement);

                    modalAlertaElement.querySelector('.btn-close')?.addEventListener('click', () => modalAlerta.hide());
                    modalAlertaElement.addEventListener('click', event => {
                        if (event.target === modalAlertaElement) {
                            modalAlerta.hide();
                        }
                    });
                } else {
                    console.error('El modal no se ha cargado correctamente');
                }
            })
            .catch(error => console.error('Error al cargar el modal:', error));
    }

    function selectsCompletos() {
        const selects = [selectClientes, selectCultivos, selectVariedades, selectCuarteles, selectGuia];
        return selects.every(select => {
            const val = select.value.trim().toLowerCase();
            return val !== '' && val !== '0' && val !== 'seleccione una opción';
        });
    }

    function actualizarTabla() {
        if (!modalAlerta) {
            console.error('Modal no está listo aún');
            return;
        }

        if (!selectsCompletos()) {
            modalAlerta.show();
            return;
        }

        tabla.innerHTML = '';

        fetch('http://localhost:5080/api/despachos/detalle')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
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
                    var row = tabla.insertRow();
                    var cell = row.insertCell(0);
                    cell.colSpan = 11;
                    cell.classList.add('text-center', 'text-muted');
                    cell.textContent = 'No hay registros que coincidan con los filtros.';
                }
            })
            .catch(error => console.error('Error al cargar los datos del API:', error));
    }

    cargarModal().then(() => {
        btnFiltrar.disabled = false;
        btnFiltrar.addEventListener('click', actualizarTabla);
    });

});

function verDespacho(id) {
    console.log("Ver despacho con ID:", id);
}

function editarDespacho(id) {
    console.log("Editar despacho con ID:", id);
}


function eliminarDespacho(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este despacho?")) {
        fetch(`http://localhost:5080/api/despachos/detalle/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            // Revisamos si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            // Aquí podemos verificar si la respuesta es correcta
            if (data.success) {
                alert(data.message);  // Muestra el mensaje de éxito
                actualizarTabla();  // Actualiza la tabla para reflejar los cambios
            } else {
                alert(data.message);  // Muestra el mensaje de error si no se eliminó
            }
        })
        .catch(error => {
            console.error('Error al eliminar el despacho:', error);
            alert('Ocurrió un error al intentar eliminar el despacho: ' + error.message);
        });
    }
}
