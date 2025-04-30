using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

[Route("api/despachos_body")]
[ApiController]
public class DespachosController : ControllerBase
{
    private readonly DatabaseConnection _dbConnection;

    public DespachosController()
    {
        _dbConnection = new DatabaseConnection();
    }

    // Ruta para obtener todos los despachos_body
    [HttpGet]
    public IActionResult GetDespachos()
    {
        try
        {
            using (var connection = _dbConnection.GetConnection())
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM despachos_body"; // Ajusta esta consulta según tu estructura de tabla
                var reader = command.ExecuteReader();

                var result = new List<Dictionary<string, object>>();

                while (reader.Read())
                {
                    var row = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        row[reader.GetName(i)] = reader.GetValue(i);
                    }
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


// =============================================================================================================

[Route("api/despachos_head")]
[ApiController]
public class DespachosHeadController : ControllerBase
{
    private readonly DatabaseConnection _dbConnection;

    public DespachosHeadController()
    {
        _dbConnection = new DatabaseConnection();
    }

    // Ruta para obtener todos los despachos_head
    [HttpGet]
    public IActionResult GetDespachosHead()
    {
        try
        {
            using (var connection = _dbConnection.GetConnection())
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM despachos_head"; // Ajusta esta consulta según tu estructura de tabla
                var reader = command.ExecuteReader();

                var result = new List<Dictionary<string, object>>();

                while (reader.Read())
                {
                    var row = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        row[reader.GetName(i)] = reader.GetValue(i);
                    }
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
