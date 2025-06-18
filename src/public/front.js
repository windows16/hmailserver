document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('addEmailForm'); // Formulario para agregar correos
    const resultado = document.getElementById('resultado'); // Elemento para mostrar mensajes
    const tableBody = document.querySelector('#resultsTable tbody'); // Cuerpo de la tabla

    // Cargar los correos al cargar la página
    await cargarCorreos();

    // Manejar el envío del formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar que la página se recargue

        const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseña').value;

        try {
            const response = await fetch('/api/correos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contraseña }),
            });
               
            if (!response.ok) {
                // Si el servidor devuelve un error, intenta analizar el JSON
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error desconocido');
            }
            
            const data = await response.json();

                // Mostrar mensaje de éxito
                resultado.textContent = data.message;
                resultado.className = 'success'; // Clase CSS para éxito
                form.reset(); // Limpiar el formulario
                await cargarCorreos(); // Recargar la tabla
            
        } catch (error) {
            // Mostrar mensaje de error si ocurre un problema en el cliente
            resultado.textContent = `Error al enviar los datos: ${error.message}`;
            resultado.className = 'error'; // Clase CSS para error
            console.error('❌ Error al enviar los datos:', error);
        }
    });

    // Función para cargar los correos desde el endpoint /api/info_correo
    async function cargarCorreos() {
        try {
            const response = await fetch('/api/info_correo');
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // Limpiar la tabla antes de agregar nuevos datos
            tableBody.innerHTML = '';

            // Insertar los datos en la tabla
            data.forEach((row) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${row.accountaddress}</td>`;
                tableBody.appendChild(tr);
            });
        } catch (error) {
            console.error('❌ Error al cargar los datos:', error);
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="1" style="color: red;">Error al cargar los datos</td>`;
            tableBody.appendChild(tr);
        }
    }
});





