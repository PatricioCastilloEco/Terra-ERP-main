
    // Al presionar Ver Detalle
    document.getElementById('btnVerDetalle').addEventListener('click', function () {
        const tabla = document.querySelector('#tabla-despacho tbody');
        const contenedorTabla = document.getElementById('detalle-despacho');
        const mensaje = document.getElementById('sin-datos');
        const infoCards = document.getElementById('default-info-cards');
        const infoGraphs = document.getElementById('info-graphs');

        infoCards.classList.add('d-none');
        infoGraphs.classList.add('d-none');
        contenedorTabla.classList.remove('d-none');

        if (tabla && tabla.rows.length > 0) {
            mensaje.classList.add('d-none');
        } else {
            mensaje.classList.remove('d-none');
        }
    });

    // Cargar gráficos al cargar página
    window.addEventListener('DOMContentLoaded', () => {
        // Razón social
        new Chart(document.getElementById('graficoRazonSocial'), {
            type: 'doughnut',
            data: {
                labels: ['AGRÍCOLA LA FLOR ORIENTE'],
                datasets: [{
                    data: [116449],
                    backgroundColor: ['#2E3B87']
                }]
            },
            options: {
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.formattedValue} kg` } },
                }
            }
        });

        // Variedad
        new Chart(document.getElementById('graficoVariedad'), {
            type: 'doughnut',
            data: {
                labels: ['SKEENA', 'KORDIA', 'REGINA', 'LAPINS'],
                datasets: [{
                    data: [33700, 14300, 49000, 21000],
                    backgroundColor: ['#2E3B87', '#88D135', '#3DCCEC', '#A4D65E']
                }]
            },
            options: {
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.formattedValue} kg` } },
                }
            }
        });

        // Curva
        new Chart(document.getElementById('graficoCurva'), {
            type: 'line',
            data: {
                labels: ['2024-50', '2024-51', '2024-52'],
                datasets: [{
                    label: 'KG',
                    data: [40000, 62000, 12000],
                    borderColor: '#2E3B87',
                    backgroundColor: 'rgba(46, 59, 135, 0.2)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    y: {
                        ticks: {
                            callback: value => value.toLocaleString()
                        }
                    }
                }
            }
        });
    });

