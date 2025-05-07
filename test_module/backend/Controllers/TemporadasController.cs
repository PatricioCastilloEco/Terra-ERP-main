using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace backend.Controllers
{
    [Route("api/temporadas")]
    [ApiController]
    public class TemporadasController : ControllerBase
    {
        private readonly DatabaseConnection _dbConnection;

        public TemporadasController()
        {
            _dbConnection = new DatabaseConnection();
        }

        // Ruta para obtener todas las temporadas
        [HttpGet]
        public IActionResult GetTemporadas()
        {
            try
            {
                using (var connection = _dbConnection.GetConnection())
                {
                    connection.Open();
                    var command = connection.CreateCommand();
                    command.CommandText = "SELECT Fecha_inicio, Fecha_fin FROM temporadas";
                    var reader = command.ExecuteReader();

                    var result = new List<Dictionary<string, object>>();

                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        row["Fecha_inicio"] = reader["Fecha_inicio"];
                        row["Fecha_fin"] = reader["Fecha_fin"];
                        result.Add(row);
                    }

                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
