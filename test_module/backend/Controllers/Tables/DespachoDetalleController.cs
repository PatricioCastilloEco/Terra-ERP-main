using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace backend.Controllers.Tables
{
    [Route("api/despachos/detalle")]
    [ApiController]
    public class DespachoDetalleController : ControllerBase
    {
        private readonly DatabaseConnection _dbConnection;

        public DespachoDetalleController()
        {
            _dbConnection = new DatabaseConnection();
        }

        // Ruta para obtener los despachos resumen
        [HttpGet]
        public IActionResult GetDespachosResumen()
        {
            try
            {
                using (var connection = _dbConnection.GetConnection())
                {
                    connection.Open();
                    var command = connection.CreateCommand();
                    command.CommandText = @"
                                          SELECT 
                                            c.idClientes AS 'ID Cliente',
                                            c.RazonSocial AS 'RazonSocial',
                                            (SELECT t.Fecha_Inicio FROM temporadas t WHERE t.idTemporadas = 1) AS 'Fecha',
                                            v.Nombre AS 'Variedad',
                                            COALESCE(cu.Nombre, 'Sin Cuartel') AS 'Cuartel',
                                            d.NumeroGua AS 'Guía',
                                            1200 AS 'BINS',
                                            200 AS 'KG Según guía',
                                            db.Kilos_estimados AS 'KG Recepcionados',
                                            '' AS 'Estado'
                                        FROM 
                                            despachos_head d
                                        LEFT JOIN Clientes c ON d.clientes_idclientes = c.idClientes
                                        LEFT JOIN cuarteles cu ON d.transporte = cu.idCuertes
                                        LEFT JOIN despachos_body db ON d.idDespachos = db.despachos_body_id
                                        LEFT JOIN variedad v ON db.despachos_body_id = v.idproductos  -- Aquí traemos la variedad
                                        WHERE d.transporte IS NOT NULL
                                        GROUP BY 
                                            c.idClientes, 
                                            cu.Nombre, 
                                            d.NumeroGua,
                                            v.Nombre,
                                            db.Kilos_estimados
                                        LIMIT 10;
                    ";

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
}
