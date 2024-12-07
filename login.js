const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const { addUser, initializeDatabase } = require('./database');

// Inicializar la base de datos al inicio
initializeDatabase();

const db = new sqlite3.Database('./flexifit.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
        // Notifica al usuario del error
        showError('Error de conexión con la base de datos');
        return;
    }
    console.log('Conectado a la base de datos flexifit.db');
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault()
    
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const errorMessage = document.getElementById('error-message')
    
    function validateInputs(username, password) {
        if (!username || !password) {
            return false;
        }
        return true;
    }

    if (!validateInputs(username, password)) {
        errorMessage.textContent = 'Por favor, completa todos los campos';
        return;
    }

    // Consultar la base de datos
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            console.error(err);
            errorMessage.textContent = 'Error al intentar iniciar sesión';
            return;
        }

        if (row) {
            bcrypt.compare(password, row.password, (err, result) => {
                if (result) {
                    errorMessage.textContent = '';
                    console.log('Login exitoso');
                    // window.location.href = 
                } else {
                    errorMessage.textContent = 'Usuario o contraseña incorrectos';
                }
            });
        } else {
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
        }
    })
})

// Funcionalidad para el botón 'Crear Cuenta'
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const registerErrorMessage = document.getElementById('register-error-message');

    if (!username || !password) {
        registerErrorMessage.textContent = 'Por favor, completa todos los campos';
        return;
    }

    addUser(username, password);
    registerErrorMessage.textContent = 'Cuenta creada exitosamente';
    console.log('Cuenta creada para:', username);
});
