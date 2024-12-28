const mysql = require('mysql2/promise');

// Configuración de la conexión
const pool = mysql.createPool({
    host: 'localhost',       // Dirección del servidor MySQL
    port: 3306,              // Puerto (por defecto es 3306)
    user: 'root',            // Usuario (ajusta según tu configuración)
    password: 'Colmillo12',  // Contraseña
    database: 'flexifit'     // Base de datos a utilizar
});

// Función para inicializar la base de datos
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexion exitosa a la base de datos MySQL');

        // Crear la tabla de usuarios si no existe
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        console.log('Tabla "users" verificada o creada.');

        connection.release(); // Liberar la conexión
    } catch (err) {
        console.error('Error al inicializar la base de datos:', err.message);
    }
}

// Exportar funciones para su uso en otras partes del proyecto
module.exports = { initializeDatabase, pool };