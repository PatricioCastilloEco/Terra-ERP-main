using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

[Route("api/cuarteles")]
[ApiController]
public class CuartelesController : ControllerBase
{
    private readonly DatabaseConnection _dbConnection;

    public CuartelesController()
    {
        _dbConnection = new DatabaseConnection();
    }

    // Ruta para obtener todos los cuarteles
    [HttpGet]
    public IActionResult GetCuarteles()
    {
        try
        {
            using (var connection = _dbConnection.GetConnection())
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT Nombre FROM cuarteles"; // Consulta para obtener solo el campo Nombre
                var reader = command.ExecuteReader();

                var result = new List<Dictionary<string, object>>();

                while (reader.Read())
                {
                    var row = new Dictionary<string, object>();
                    row["Nombre"] = reader["Nombre"]; // Aquí seleccionamos el campo Nombre de la tabla cuarteles
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
