using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace backend.Controllers.filters
{
    [Route("api/calculobinsrule3")]
    [ApiController]
    public class CalculoBinsRule3 : ControllerBase
    {
        private readonly DatabaseConnection _dbConnection;

        public CalculoBinsRule3()
        {
            _dbConnection = new DatabaseConnection();
        }

        [HttpGet]
        public IActionResult GetCalculoRegla3()
        {
            try
            {
                using (var connection = (MySqlConnection)_dbConnection.GetConnection())
                {
                    connection.Open();

                    var command = new MySqlCommand
                    {
                        Connection = connection,
                        CommandText = @"
                            SELECT 
                                4 AS cantidad_original,       -- A
                                200 AS costo_original,        -- B
                                7 AS nueva_cantidad,          -- C
                                (200 * 7) / 4 AS costo_estimado; -- X = (B * C) / A
                        "
                    };

                    using (var reader = command.ExecuteReader())
                    {
                        var result = new List<Dictionary<string, object>>();

                        while (reader.Read())
                        {
                            var row = new Dictionary<string, object>
                            {
                                ["cantidad_original"] = reader["cantidad_original"],
                                ["costo_original"] = reader["costo_original"],
                                ["nueva_cantidad"] = reader["nueva_cantidad"],
                                ["costo_estimado"] = reader["costo_estimado"]
                            };
                            result.Add(row);
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
}
