using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class HomeController : Controller
    {
        // Acción para mostrar la página de inicio
        public IActionResult Index()
        {
            return View();
        }
    }
}
