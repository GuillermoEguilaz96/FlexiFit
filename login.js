const bcrypt = require('bcrypt');
const { ipcRenderer } = require('electron');

// Función para verificar credenciales de inicio de sesión
async function loginUser(username, password) {
    const result = await ipcRenderer.invoke('check-user-credentials', username, password);

    if (result.success) {
        console.log('Login exitoso');
        // Almacenar el ID del usuario
        localStorage.setItem('usuarioId', result.userId);

        window.location.href = 'ejercicios.html';
    } else {
        console.error('Error al iniciar sesión:', result.error);
    }
}

// Función para registrar un nuevo usuario
async function registerUser(username, password, confirmPassword) {
    if (password !== confirmPassword) {
        console.error('Las contraseñas no coinciden');
        return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await ipcRenderer.invoke('add-user', username, hashedPassword);

    if (result.success) {
        console.log('Usuario registrado exitosamente');
    } else {
        console.error('Error al registrar usuario:', result.error);
    }
}

// Manejar el formulario de inicio de sesión
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            await loginUser(username, password);
        });
    }

    // Manejar el formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const username = document.getElementById('new-username').value;
            const password = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            await registerUser(username, password, confirmPassword);
        });
    }
});