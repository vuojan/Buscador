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
                    <td>${item['Cta. N°']}</td>
                    <td>${item['Nombre']}</td>
                    <td>${item['Direccion']}</td>
                    <td>${item['Nombre de fantasia']}</td>
                `;
                tbody.appendChild(row);
            });
        }

        // Renderiza la tabla completa al principio
        renderTable(data);

        // Añadir el evento de búsqueda
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', () => {
            console.log("asd")
            const query = searchInput.value.toLowerCase();
            const filteredData = data.filter(item => 
                item.Nombre.toLowerCase().includes(query) ||
                item.Direccion.toLowerCase().includes(query) ||
                (item['Cta. N°'] && item['Cta. N°'].toString().toLowerCase().includes(query)) ||
                (item['Nombre de fantasia'] && item['Nombre de fantasia'].toLowerCase().includes(query))

            );
            
            renderTable(filteredData);
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));})