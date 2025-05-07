window.addEventListener('DOMContentLoaded', () => {
  // Gráfico de Barras 1
  new Chart(document.getElementById('barChart1'), {
      type: 'bar',
      data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
          datasets: [{
              label: 'Ventas',
              data: [12, 19, 3, 5, 2],
              backgroundColor: '#2E3B87', // Azul oscuro
              borderRadius: 6
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: { display: false },
              tooltip: {
                  callbacks: {
                      label: ctx => `Ventas: ${ctx.formattedValue}`
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize: 5
                  }
              }
          }
      }
  });

  // Gráfico de Barras 2
  new Chart(document.getElementById('barChart2'), {
      type: 'bar',
      data: {
          labels: ['Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'],
          datasets: [{
              label: 'Ventas',
              data: [22, 13, 7, 9, 15],
              backgroundColor: '#3DCCEC', // Celeste
              borderRadius: 6
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: { display: false },
              tooltip: {
                  callbacks: {
                      label: ctx => `Ventas: ${ctx.formattedValue}`
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize: 5
                  }
              }
          }
      }
  });

  // Gráfico de Torta 1
  new Chart(document.getElementById('pieChart1'), {
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
          plugins: {
              legend: { position: 'bottom' },
              tooltip: {
                  callbacks: {
                      label: ctx => `${ctx.label}: ${ctx.formattedValue}`
                  }
              }
          }
      }
  });

  // Gráfico de Torta 2
  new Chart(document.getElementById('pieChart2'), {
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
          plugins: {
              legend: { position: 'bottom' },
              tooltip: {
                  callbacks: {
                      label: ctx => `${ctx.label}: ${ctx.formattedValue}`
                  }
              }
          }
      }
  });
});