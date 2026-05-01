document.addEventListener('DOMContentLoaded', function() {
    async function loadComponent(url, containerId) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const html = await response.text();
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error cargando ${url}:`, error);
        }
    }

    // Cargar header y footer usando rutas absolutas desde la raíz
    loadComponent('/components/header.html', 'header-container');
    loadComponent('/components/footer.html', 'footer-container');
});
