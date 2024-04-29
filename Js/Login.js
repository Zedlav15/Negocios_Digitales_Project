document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío normal del formulario

        const formData = new FormData(loginForm);
        fetch('../php/Login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())  // Primero convierte la respuesta a texto
        .then(text => {
            try {
                return JSON.parse(text); // Intenta parsearla como JSON
            } catch (error) {
                console.error('No se pudo parsear la respuesta como JSON:', text);
                throw new Error('La respuesta del servidor no es JSON válido: ' + text);
            }
        })
        .then(data => {
            if (data.success) {
                // Guardar en localStorage que el inicio de sesión fue exitoso
                localStorage.setItem('userLoggedIn', true);

                // Redireccionar a la página principal o donde sea necesario
                window.location.href = '../index.html';
            } else {
                alert(data.message); // Mostrar mensaje de error
            }
        })
        .catch(error => {
            console.error('Error al procesar la respuesta:', error);
            alert('Error al procesar la respuesta: ' + error.message);
        });
        
    });
});
