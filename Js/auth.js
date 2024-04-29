// auth.js

document.addEventListener('DOMContentLoaded', (event) => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');

    if (userLoggedIn) {
        // Usuario está logueado, mostrar el botón de cierre de sesión y ocultar el de inicio de sesión
        if (loginButton) loginButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'inline-block'; // O 'block' dependiendo de tu diseño
    } else {
        // Usuario no está logueado, mostrar el botón de inicio de sesión y ocultar el de cierre de sesión
        if (loginButton) loginButton.style.display = 'inline-block'; // O 'block' dependiendo de tu diseño
        if (logoutButton) logoutButton.style.display = 'none';
    }
});

function logout() {

    Swal.fire({
        title: "Cerrar sesion",
        text: "¿Estas seguro que deseas cerrar sesion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a544",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cerrar sesion"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('userLoggedIn');
            // Restablecer la UI para reflejar que el usuario ha cerrado sesión
            const loginButton = document.getElementById('loginButton');
            const logoutButton = document.getElementById('logoutButton');
            if (loginButton) loginButton.style.display = 'inline-block'; // O 'block' dependiendo de tu diseño
            if (logoutButton) logoutButton.style.display = 'none';
            // Redirige al usuario a la página de inicio de sesión
            window.location.href = 'index.html';
        }
    });

}
// Asegúrate de exponer la función logout para que sea accesible globalmente
window.logout = logout;
