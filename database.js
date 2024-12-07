const sqlite3 = require('sqlite3').verbose();

// Función para inicializar la base de datos
function initializeDatabase() {
    let db = new sqlite3.Database('./flexifit.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Conectado a la base de datos SQLite.');
    });

    // Crea una tabla de usuarios si no existe
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creando tabla:', err.message);
        }
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Cerrando la conexión a la base de datos.');
    });
}

// Función para añadir un nuevo usuario
function addUser(username, password) {
    let db = new sqlite3.Database('./flexifit.db', (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function(err) {
        if (err) {
            return console.error('Error añadiendo usuario:', err.message);
        }
        console.log(`Usuario añadido con ID: ${this.lastID}`);
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

module.exports = { addUser,initializeDatabase};