using Microsoft.AspNetCore.Mvc;

[Route("api/clientes")]
[ApiController]
public class ClientesController : ControllerBase
{
    private readonly DatabaseConnection _dbConnection;

    public ClientesController()
    {
        _dbConnection = new DatabaseConnection();
    }

    // Ruta para obtener todos los clientes (solo Razon Social)
    [HttpGet]
    public IActionResult GetClientes()
    {
        try
        {
            using (var connection = _dbConnection.GetConnection())
            {
                connection.Open();
                var command = connection.CreateCommand();

                // Consulta ajustada para obtener solo el campo 'Razon Social'
                command.CommandText = "SELECT RazonSocial FROM clientes"; // Ajusta el nombre de la columna si es necesario
                var reader = command.ExecuteReader();

                var result = new List<string>(); // Cambié la lista para contener solo los valores de RazonSocial

                while (reader.Read())
                {
                    // Agrega solo el valor de RazonSocial a la lista
                    result.Add(reader.GetString(0)); // Suponiendo que RazonSocial es la primera columna
                }

                return Ok(result); // Devuelve solo la lista de razones sociales
            }
        }
        catch (Exception ex)
        {
            return BadRequest($"Error: {ex.Message}");
        }
    }
}
