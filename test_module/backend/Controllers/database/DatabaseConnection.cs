using MySql.Data.MySqlClient;
using System;
using System.Data;

public class DatabaseConnection
{
    private string connectionString = "Server=66.97.45.177;Port=3306;Database=agricola;User=pcastillo;Password=Eco123*;";

    // Método para obtener la conexión sin abrirla directamente
    public IDbConnection GetConnection()
    {
        return new MySqlConnection(connectionString);
    }

    // Método para ejecutar la consulta (Ejemplo de uso de la conexión)
    public string TestConnection()
    {
        try
        {
            using (var connection = GetConnection()) // Usamos "using" para asegurarnos de que la conexión se cierre automáticamente
            {
                connection.Open();  // Abrimos la conexión solo cuando sea necesario
                return "Conexión exitosa a la base de datos";
            }
        }
        catch (Exception ex)
        {
            // Manejo de error de conexión
            return "Error al conectar a la base de datos: " + ex.Message;
        }
    }
}
