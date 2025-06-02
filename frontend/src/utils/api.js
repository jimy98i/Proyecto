const API_URL = import.meta.env.VITE_API_URL;

// Función para obtener el token CSRF de las cookies
const getCsrfToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; XSRF-TOKEN=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }
    return null;
};

// Función para inicializar el token CSRF
export const initializeCsrf = async () => {
    try {
        const response = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
            method: 'GET',
            // credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al obtener el token CSRF');
        }
        
        return true;
    } catch (error) {
        console.error('Error al inicializar CSRF:', error);
        return false;
    }
};

// Función base para hacer peticiones HTTP
export const fetchApi = async (endpoint, options = {}) => {
    const token = localStorage.getItem('access_token');
    const csrfToken = getCsrfToken();

    const defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    };

    if (csrfToken) {
        defaultHeaders['X-XSRF-TOKEN'] = csrfToken;
    }

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Si el hosting requiere autenticación básica, añade el header Authorization
    const basicUser = import.meta.env.VITE_API_BASIC_USER;
    const basicPass = import.meta.env.VITE_API_BASIC_PASS;
    if (basicUser && basicPass) {
        defaultHeaders['Authorization'] = 'Basic ' + btoa(`${basicUser}:${basicPass}`);
    }

    const config = {
        ...options,
        credentials: 'include',
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    if (options.body && typeof options.body === 'object') {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        if (response.status === 419) { // CSRF token mismatch
            await initializeCsrf();
            // Reintentar la petición una vez
            return fetchApi(endpoint, options);
        }
        // DEBUG: Mostrar respuesta cruda si falla el parseo
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error('Respuesta cruda del backend:', text);
            throw e;
        }
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
};

// Funciones específicas para diferentes tipos de peticiones
export const get = (endpoint, options = {}) => {
    return fetchApi(endpoint, { ...options, method: 'GET' });
};

export const post = (endpoint, data, options = {}) => {
    return fetchApi(endpoint, { ...options, method: 'POST', body: data });
};

export const put = (endpoint, data, options = {}) => {
    return fetchApi(endpoint, { ...options, method: 'PUT', body: data });
};

export const del = (endpoint, options = {}) => {
    return fetchApi(endpoint, { ...options, method: 'DELETE' });
};