document.addEventListener('DOMContentLoaded', function() {
    async function loadHTML(url, containerId) {
        try {
            console.log(`Intentando cargar ${url}`);
            const response = await fetch(url);
            
            // Mostrar el estado de la respuesta
            console.log(`Status: ${response.status} ${response.statusText}`);
            
            if (!response.ok) {
                throw new Error(`Error HTTP! status: ${response.status}`);
            }
            
            const html = await response.text();
            console.log(`Contenido recibido de ${url}:`, html.substring(0, 100) + '...');
            
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`No se encontró el contenedor con ID: ${containerId}`);
            }
            
            container.innerHTML = html;
            console.log(`${url} cargado exitosamente en ${containerId}`);
            
        } catch (error) {
            console.error(`Error detallado cargando ${url}:`, error);
            console.log('URL completa:', new URL(url, window.location.href).href);
            
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `
                    <div style="color: red; padding: 20px; border: 1px solid red; margin: 10px;">
                        Error cargando ${url}<br>
                        ${error.message}<br>
                        Verifica que el archivo existe y es accesible.
                    </div>
                `;
            }
        }
    }

    // Intentar cargar los componentes
    console.log('Iniciando carga de componentes...');
    loadHTML('header.html', 'header-container');
    loadHTML('footer.html', 'footer-container');
});