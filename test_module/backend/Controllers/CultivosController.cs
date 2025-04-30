using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

[Route("api/cultivos")]
[ApiController]
public class CultivosController : ControllerBase
{
    private readonly DatabaseConnection _dbConnection;

    public CultivosController()
    {
        _dbConnection = new DatabaseConnection();
    }

    // Ruta para obtener todos los cultivos
    [HttpGet]
    public IActionResult GetCultivos()
    {
        try
        {
            using (var connection = _dbConnection.GetConnection())
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT nombrecultivos FROM cultivos"; // Consulta para obtener solo el campo nombrecultivos
                var reader = command.ExecuteReader();

                var result = new List<Dictionary<string, object>>();

                while (reader.Read())
                {
                    var row = new Dictionary<string, object>();
                    row["nombrecultivos"] = reader["nombrecultivos"]; // Aquí solo seleccionamos el campo nombrecultivos
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
