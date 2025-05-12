async function cargarGraficas() {
  try {
    const response = await fetch('../views/graphics/graficos.html');
    const html = await response.text();
    const container = document.getElementById('graficaContainer');
    container.innerHTML = html;
    console.log("HTML de gráficos insertado");

    // Esperamos un ciclo para asegurar que los elementos estén en el DOM
    setTimeout(() => inicializarGraficos(), 100);
  } catch (error) {
    console.error("Error al cargar las gráficas:", error);
  }
}

function inicializarGraficos() {
  const barChart1 = document.getElementById('barChart1');
  const barChart2 = document.getElementById('barChart2');
  const pieChart1 = document.getElementById('pieChart1');
  const pieChart2 = document.getElementById('pieChart2');

  if (!barChart1 || !barChart2 || !pieChart1 || !pieChart2) {
    console.error("Faltan uno o más canvas para los gráficos");
    return;
  }

  // Gráfico 1: Calibre
  new Chart(barChart1, {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [{
        label: 'Calibre',
        data: [12, 19, 3, 5, 2],
        backgroundColor: '#2E3B87',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // Gráfico 2: Variedad
  new Chart(barChart2, {
    type: 'bar',
    data: {
      labels: ['Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'],
      datasets: [{
        label: 'Variedad',
        data: [22, 13, 7, 9, 15],
        backgroundColor: '#88D135',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // Gráfico 3: Nave (Torta)
  new Chart(pieChart1, {
    type: 'pie',
    data: {
      labels: ['SKEENA', 'KORDIA', 'REGINA', 'LAPINS'],
      datasets: [{
        data: [10, 20, 30, 40],
        backgroundColor: ['#2E3B87', '#88D135', '#3DCCEC', '#A4D65E']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });

  // Gráfico 4: Productor (Torta)
  new Chart(pieChart2, {
    type: 'pie',
    data: {
      labels: ['Verde', 'Naranja', 'Azul'],
      datasets: [{
        data: [15, 25, 35],
        backgroundColor: ['#88D135', '#FF9F40', '#2E3B87']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });

  console.log("Gráficos inicializados");
}

window.addEventListener('DOMContentLoaded', cargarGraficas);
