document.addEventListener('DOMContentLoaded', () => {
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector('#data-table tbody');

        function renderTable(filteredData) {
            tbody.innerHTML = ''; // Limpiar la tabla
            filteredData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item['cuentaNumero']}</td>
                    <td>${item['nombre']}</td>
                    <td>${item['direccion']}</td>
                    <td>${item['nombreComercial']}</td>
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
    .catch(error => console.error('Error al cargar el JSON:', error));})