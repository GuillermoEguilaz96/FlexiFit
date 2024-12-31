document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM completamente cargado y analizado");

    // Función para cargar la información del usuario desde localStorage
    function loadUserInfo() {
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const improvements = localStorage.getItem('improvements');
        
        if (username) {
            document.getElementById('username').value = username;
        }
        if (email) {
            document.getElementById('email').value = email;
        }
        if (improvements) {
            document.getElementById('improvements').value = improvements;
        }
    }

    // Función para editar el perfil y guardar en localStorage
    function editProfile() {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const improvements = document.getElementById('improvements').value;
        
        // Guardar los nuevos datos en localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('improvements', improvements);
        
        alert('Datos guardados exitosamente!');
    }

    // Llamar a la función para cargar la información del usuario
    loadUserInfo();

    // Asignar eventos a los botones
    document.getElementById('edit-profile').addEventListener('click', editProfile);

    const logout = document.querySelector('.logout');
    if (logout) {
        console.log("Botón de logout encontrado");
        logout.addEventListener('click', function() {
            alert('Cierre de sesión realizado.');
            console.log('Redirigiendo a login.html');
            window.location.href = 'login.html';
        });
    } else {
        console.error('El botón de cerrar sesión no se encontró en el DOM.');
    }

    // Guardar datos del perfil al enviar el formulario
    document.getElementById('userProfileForm').addEventListener('submit', function(event){
        event.preventDefault(); // Evitar el envío del formulario
        
        editProfile();
    });
});
