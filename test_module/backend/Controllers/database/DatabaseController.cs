using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;

namespace YourNamespace.Controllers
{
    [Route("api/database")]
    [ApiController]
    public class DatabaseController : ControllerBase
    {
        private readonly DatabaseConnection _dbConnection;

        public DatabaseController()
        {
            _dbConnection = new DatabaseConnection();
        }

        // Ruta para probar la conexión a la base de datos
        [HttpGet("test")]
        public IActionResult TestConnection()
        {
            try
            {
                var result = _dbConnection.TestConnection();

                if (result.Contains("exitosa"))
                {
                    return Ok(result);  // Si la conexión es exitosa, devuelve un código 200 OK
                }
                else
                {
                    return BadRequest(result);  // Si hubo un error, devuelve un código 400 BadRequest
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al conectar a la base de datos: {ex.Message}");
            }
        }
    }
}
