using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Registrar servicios
builder.Services.AddControllersWithViews();  // Para habilitar Razor Views

// Agregar la conexión a la base de datos en los servicios
builder.Services.AddSingleton<DatabaseConnection>();  // Asegúrate de registrar DatabaseConnection como un servicio

// Configura la URL de ejecución
builder.WebHost.UseUrls("http://localhost:5080");

var app = builder.Build();

app.UseStaticFiles();

// Configuración de rutas para las APIs
app.MapControllers();

// Si necesitas habilitar CORS para permitir peticiones desde otros dominios (opcional)
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Configurar la ruta predeterminada para las vistas Razor
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Ejecutar la aplicación
app.Run();
