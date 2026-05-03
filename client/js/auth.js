const API_URL = 'http://localhost:3000/api';
const TOKEN_KEY = 'verdevida_token';

function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

function isLoggedIn() {
    const token = getToken();
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

function logout() {
    removeToken();
    window.location.href = '/pages/login_register.html';
}

async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
    }

    setToken(data.token);
    return data;
}

async function register(nombre, email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error al registrarse');
    }

    setToken(data.token);
    return data;
}

async function fetchWithAuth(url, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        removeToken();
        window.location.href = '/pages/login_register.html';
        return;
    }

    return response;
}

function redirectIfNotLoggedIn() {
    if (!isLoggedIn()) {
        window.location.href = '/pages/login_register.html';
    }
}

function redirectIfLoggedIn() {
    if (isLoggedIn()) {
        window.location.href = '/user/dashboard.html';
    }
}

async function getMe() {
    const response = await fetchWithAuth('/auth/me');
    if (!response) return null;
    return response.json();
}

// Exponer funciones globalmente para uso en HTML inline
window.auth = {
    getToken,
    setToken,
    removeToken,
    isLoggedIn,
    logout,
    login,
    register,
    fetchWithAuth,
    redirectIfNotLoggedIn,
    redirectIfLoggedIn,
    getMe,
};
