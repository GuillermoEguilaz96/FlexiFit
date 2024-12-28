const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { initializeDatabase, pool } = require('./scripts/database');
const bcrypt = require('bcrypt');

async function startApp() {
    await initializeDatabase();

    ipcMain.handle('check-user-credentials', async (event, username, password) => {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);

            connection.release();

            if (rows.length > 0) {
                const user = rows[0];
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    return { success: true, userId: user.id };
                } else {
                    return { success: false, error: 'Usuario o contraseña incorrectos' };
                }
            } else {
                return { success: false, error: 'Usuario o contraseña incorrectos' };
            }
        } catch (err) {
            return { success: false, error: err.message };
        }
    });

    ipcMain.handle('add-user', async (event, username, hashedPassword) => {
        try {
            const connection = await pool.getConnection();
            await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
            connection.release();
            return { success: true };
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return { success: false, error: 'El nombre de usuario ya está en uso' };
            } else {
                return { success: false, error: err.message };
            }
        }
    });

    ipcMain.handle('guardar-resultado-calorias', async (event, usuarioId, calorias, objetivo) => {
        try {
            const connection = await pool.getConnection();
            await connection.query('INSERT INTO resultados_calorias (usuario_id, calorias, objetivo, fecha) VALUES (?, ?, ?, NOW())', [usuarioId, calorias, objetivo]);
            connection.release();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    });

    function createWindow() {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        win.loadFile('views/login.html');
    }

    createWindow();
}

app.whenReady().then(startApp);