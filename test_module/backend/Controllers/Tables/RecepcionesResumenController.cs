using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
// MIS APIS
[Route("api/resumenDespachos")]
[ApiController]
public class RecepcionesResumenController : ControllerBase
{
    private readonly DatabaseConnection _dbConnection;

    public RecepcionesResumenController()
    {
        _dbConnection = new DatabaseConnection();
    }

    [HttpGet]
    public IActionResult GetDespachos()
    {
        try
        {
            using (var connection = _dbConnection.GetConnection())
            {
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText = @"
                    SELECT 
                        c.razonSocial AS Cliente,
                        d.fecha AS Fecha_Despacho,
                        d.NumeroGua AS Numero_Guia,
                        v.nombre AS Variedad,
                        cu.nombre AS Cuartel,
                        1200 AS BINS,
                        1200 AS Kgsegundia,
                        1200 AS Kg_recepcionados
                    FROM 
                        despachos_head d
                    JOIN 
                        Clientes c ON d.clientes_idclientes = c.idclientes
                    JOIN 
                        despachos_body db ON db.Despachos_head_idDespachos = d.idDespachos
                    JOIN 
                        variedad v ON db.variedad_idproductos = v.idproductos
                    JOIN 
                        cuarteles cu ON db.cuarteles_idCuertes = cu.idCuertes
                    LIMIT 0, 1000;
                ";

                var reader = command.ExecuteReader();
                var result = new List<Dictionary<string, object>>();

                while (reader.Read())
                {
                    var row = new Dictionary<string, object>
                    {
                        ["Cliente"] = reader["Cliente"],
                        ["Fecha_Despacho"] = reader["Fecha_Despacho"],
                        ["Numero_Guia"] = reader["Numero_Guia"],
                        ["Variedad"] = reader["Variedad"],
                        ["Cuartel"] = reader["Cuartel"],
                        ["BINS"] = reader["BINS"],
                        ["Kgsegundia"] = reader["Kgsegundia"],
                        ["Kg_recepcionados"] = reader["Kg_recepcionados"]
                    };

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
