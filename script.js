document.addEventListener('DOMContentLoaded', () => {
    // Credenciales de autenticación
    const username = "higiene";  // Usuario de ejemplo
    const password = "dic2024";  // Contraseña de ejemplo

    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const contentContainer = document.querySelector('.content'); // Cambié aquí para que coincida con tu HTML
    const loginError = document.getElementById('login-error');

    // Verificar las credenciales al enviar el formulario
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputUsername = document.getElementById('username').value;
        const inputPassword = document.getElementById('password').value;

        if (inputUsername === username && inputPassword === password) {
            loginContainer.style.display = 'none'; // Ocultar formulario de login
            contentContainer.style.display = 'block'; // Mostrar contenido
            loadData(); // Cargar los datos después de iniciar sesión
        } else {
            loginError.style.display = 'block'; // Mostrar error si las credenciales son incorrectas
        }
    });

    // Función para cargar los datos (código de tu tabla y búsqueda)
    function loadData() {
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo JSON');
                }
                return response.json();
            })
            .then(data => {
                const tbody = document.querySelector('#data-table tbody');

                // Función para renderizar la tabla
                function renderTable(filteredData) {
                    tbody.innerHTML = ''; // Limpiar la tabla
                    filteredData.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${item['cuentaNumero']}</td>
                            <td>${item['nombre']}</td>
                            <td>
                                ${item['direccion']}
                                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item['direccion'] + ', Mendoza, Ciudad')}" target="_blank" class="map-button">
                                <i class="fas fa-map-marker-alt"></i>
                                </a>
                            </td>
                            <td>${item['nombreComercial']}</td>
                            <td>${item['horario']}</td>
                        `;
                        tbody.appendChild(row);
                    });
                }

                // Renderiza la tabla completa al principio
                renderTable(data);

                // Añadir el evento de búsqueda
                const searchInput = document.getElementById('search');
                searchInput.addEventListener('input', () => {
                    const query = searchInput.value.toLowerCase();
                    const filteredData = data.filter(item => 
                        item.nombre.toLowerCase().includes(query) ||
                        item.direccion.toLowerCase().includes(query) ||
                        (item['cuentaNumero'] && item['cuentaNumero'].toString().toLowerCase().includes(query)) ||
                        (item['nombreComercial'] && item['nombreComercial'].toLowerCase().includes(query))
                    );
                    renderTable(filteredData);
                });
            })
            .catch(error => console.error('Error al cargar el JSON:', error));
    }
});
