function ocultarPreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Espera 1 segundo adicional antes de ocultarlo para que el usuario lo perciba
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
    }, 1000);
  }
}

async function cargarPreloader() {
  try {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const res = await fetch("../views/preloader/preloader.html");
    if (!res.ok) throw new Error("No se pudo cargar el preloader");

    container.innerHTML = await res.text();

    // Ocultar después de 'load' (con delay) o forzar ocultamiento a los 6s como máximo
    window.addEventListener("load", () => {
      ocultarPreloader();
    });

    // Fallback si no se dispara 'load' en 1/3 segundos
    setTimeout(ocultarPreloader, 300);
  } catch (err) {
    console.error("Error cargando preloader:", err);
    ocultarPreloader();
  }
}

document.addEventListener("DOMContentLoaded", cargarPreloader);
