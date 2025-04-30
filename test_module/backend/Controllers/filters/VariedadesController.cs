using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

[Route("api/variedades")]
[ApiController]
public class VariedadesController : ControllerBase
{
    private readonly DatabaseConnection _dbConnection;

    public VariedadesController()
    {
        _dbConnection = new DatabaseConnection();
    }

    [HttpGet("{cultivo}")]
    public IActionResult GetVariedadesPorCultivo(string cultivo)
    {
        if (string.IsNullOrEmpty(cultivo))
        {
            return BadRequest("El nombre del cultivo no puede ser vacío.");
        }

        try
        {
            using (var connection = (MySqlConnection)_dbConnection.GetConnection()) // Conversión explícita
            {
                connection.Open(); // Asegúrate de abrir la conexión antes de ejecutar cualquier comando.

                var command = new MySqlCommand
                {
                    Connection = connection,
                    CommandText = @"
                        SELECT v.nombre
                        FROM variedad v
                        INNER JOIN cultivos c ON v.Id_cultivos = c.idcultivos
                        WHERE c.nombrecultivos = @cultivo;
                    "
                };

                command.Parameters.AddWithValue("@cultivo", cultivo.ToUpper());

                using (var reader = command.ExecuteReader())
                {
                    var result = new List<Dictionary<string, object>>();

                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>
                        {
                            ["Nombre"] = reader["nombre"]
                        };
                        result.Add(row);
                    }

                    if (result.Count == 0)
                    {
                        return NotFound("No se encontraron variedades para el cultivo especificado.");
                    }

                    return Ok(result);
                }
            }
        }
        catch (MySqlException ex)
        {
            return StatusCode(500, $"Error de base de datos: {ex.Message}");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }
}
