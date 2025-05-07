using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;

namespace backend.Controllers.database
{
    [Route("api/numeroGua")]
    [ApiController]
    public class DespachosController : ControllerBase
    {
        private readonly DatabaseConnection _dbConnection;

        public DespachosController()
        {
            _dbConnection = new DatabaseConnection();
        }

        // Ruta para obtener todos los despachos (solo numeroGua)
        [HttpGet]
        public IActionResult GetDespachos()
        {
            try
            {
                using (var connection = _dbConnection.GetConnection())
                {
                    connection.Open();
                    var command = connection.CreateCommand();

                    // Consulta para obtener solo el campo 'numeroGua'
                    command.CommandText = "SELECT numeroGua FROM despachos_head";
                    var reader = command.ExecuteReader();

                    var result = new List<string>();

                    while (reader.Read())
                    {
                        result.Add(reader.GetString(0)); // Suponiendo que numeroGua es de tipo VARCHAR o similar
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
