using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;

namespace backend.Controllers.Tables
{
    [Route("api/[controller]")]
    [ApiController]
    public class DespachosDetalleDeleteRowController : ControllerBase
    {
        private readonly DatabaseConnection _dbConnection;

        public DespachosDetalleDeleteRowController()
        {
            _dbConnection = new DatabaseConnection();
        }

        // DELETE: api/DespachosDetalleDeleteRow/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteDespacho(int id)
        {
            try
            {
                Console.WriteLine($"Eliminando despacho con ID: {id}");  // Añadimos logging para ver el ID recibido

                using (var connection = _dbConnection.GetConnection())
                {
                    connection.Open();

                    // Crear el comando para eliminar los registros en ambas tablas
                    var command = connection.CreateCommand();
                    command.CommandText = @"
                        DELETE db, d
                        FROM despachos_head d
                        JOIN despachos_body db ON d.idDespachos = db.despachos_body_id
                        WHERE d.transporte IS NOT NULL
                        AND d.clientes_idclientes = @IdCliente"; // El parámetro es el idCliente

                    // Agregar el parámetro para evitar SQL injection
                    command.Parameters.Add(new MySqlParameter("@IdCliente", MySqlDbType.Int32) { Value = id });

                    int affectedRows = command.ExecuteNonQuery();

                    // Logging para el número de filas afectadas
                    Console.WriteLine($"Filas afectadas: {affectedRows}");

                    if (affectedRows > 0)
                    {
                        return Ok(new { success = true, message = "Despacho eliminado correctamente" });
                    }
                    else
                    {
                        return NotFound(new { success = false, message = "Despacho no encontrado" });
                    }
                }
            }
            catch (Exception ex)
            {
                // Registrar el error para depuración
                Console.WriteLine($"Error al eliminar despacho: {ex.Message}");

                // Asegurarse de que la respuesta esté bien formada
                return BadRequest(new { success = false, message = $"Error: {ex.Message}" });
            }
        }
    }
}
