using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace backend.Controllers.Tables
{
    [Route("api/despachos/resumen")]
    [ApiController]
    public class DespachoResumenController : ControllerBase
    {
        private readonly DatabaseConnection _dbConnection;

        public DespachoResumenController()
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
                            (SELECT t.Fecha_Inicio FROM temporadas t WHERE t.idTemporadas = 1) AS 'Fecha',  -- Subconsulta para obtener la fecha de la temporada
                            'ejemplo' AS 'Variedad',
                            COALESCE(cu.Nombre, 'Sin Cuartel') AS 'Cuartel',  -- Usamos 'Sin Cuartel' cuando no hay coincidencia
                            d.NumeroGua AS 'Guía',
                            1200 AS 'BINS',
                            IFNULL(SUM(db.Kilos_estimados), 0) AS 'KG Según guía',
                            db.Kilos_estimados AS 'KG Recepcionados',
                            '' AS 'Estado'
                        FROM 
                            despachos_head d
                        LEFT JOIN Clientes c ON d.clientes_idclientes = c.idClientes
                        LEFT JOIN cuarteles cu ON d.transporte = cu.idCuertes
                        LEFT JOIN despachos_body db ON d.idDespachos = db.despachos_body_id
                        WHERE d.transporte IS NOT NULL
                        GROUP BY 
                            c.idClientes, 
                            cu.Nombre, 
                            d.NumeroGua
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
