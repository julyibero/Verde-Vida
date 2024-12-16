// Definir loadHTML como función global
window.loadHTML = async function(url, containerId) {
    try {
        console.log(`Intentando cargar ${url}`);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error HTTP! status: ${response.status}`);
        }
        
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`No se encontró el contenedor con ID: ${containerId}`);
        }
        
        container.innerHTML = html;
        console.log(`${url} cargado exitosamente en ${containerId}`);
        
    } catch (error) {
        console.error(`Error cargando ${url}:`, error);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="bg-red-50 p-4 rounded-md">
                    <p class="text-red-700">Error cargando ${url}</p>
                    <p class="text-red-500 text-sm">${error.message}</p>
                </div>
            `;
        }
    }
};

// Definir toggleDashboardView como función global
window.toggleDashboardView = function(view) {
    // Ocultar todas las vistas
    const views = ['dashboard', 'garden', 'cart', 'queries', 'settings'];
    views.forEach(v => {
        document.getElementById(`${v}View`).classList.add('hidden');
        document.getElementById(`${v}Tab`).classList.remove('bg-green-100', 'text-green-600');
        document.getElementById(`${v}Tab`).classList.add('text-gray-600', 'hover:bg-gray-50', 'hover:text-gray-900');
    });

    // Mostrar la vista seleccionada
    const viewElement = document.getElementById(`${view}View`);
    viewElement.classList.remove('hidden');
    document.getElementById(`${view}Tab`).classList.add('bg-green-100', 'text-green-600');

    // Cargar el contenido si no se ha cargado antes
    if (!viewElement.hasAttribute('data-loaded')) {
        loadHTML(`views/${view}.html`, `${view}View`);
        viewElement.setAttribute('data-loaded', 'true');
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar los componentes iniciales
    loadHTML('header.html', 'header-container');
    loadHTML('footer.html', 'footer-container');
    
    // Inicializar con la vista del dashboard
    toggleDashboardView('dashboard');
});

// En dashboard.js
window.toggleSettingsTab = function(view) {
    const allViews = ['profile', 'security', 'payments', 'subscription', 'notifications'];

    allViews.forEach(tab => {
        const tabButton = document.getElementById(`${tab}TabBtn`);
        const tabContent = document.getElementById(`${tab}TabContent`);

        if (tab === view) {
            tabContent.classList.remove('hidden');
            tabButton.classList.remove('text-gray-500', 'bg-gray-50');
            tabButton.classList.add('text-green-600', 'bg-white', 'border-b-2', 'border-green-600');
        } else {
            tabContent.classList.add('hidden');
            tabButton.classList.remove('text-green-600', 'bg-white', 'border-b-2', 'border-green-600');
            tabButton.classList.add('text-gray-500', 'bg-gray-50');
        }
    });
}