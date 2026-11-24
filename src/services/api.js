import axios from 'axios';
import { obtenerToken, cerrarSesion } from './sesion.js';

// Instancia única de Axios: URL base versionada y tiempo máximo de espera.
// VITE_API_URL vacío = mismo origen (el proxy de Vite o nginx envía /api al backend).
export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL ?? ''}/api/v1`,
    timeout: 10000,
});

// Adjunta el JWT en cada petición si hay sesión.
api.interceptors.request.use((config) => {
    const token = obtenerToken();
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Si el backend responde 401 con una sesión abierta, el token ya no sirve: se limpia.
api.interceptors.response.use(
    (respuesta) => respuesta,
    (error) => {
        if (error.response?.status === 401 && obtenerToken()) cerrarSesion();
        return Promise.reject(error);
    },
);

// Los 3 casos de error de Axios: respuesta HTTP con error, tiempo agotado y sin respuesta.
export function obtenerMensajeError(error) {
    if (error.response) {
        const datos = error.response.data;
        if (datos && typeof datos.error === 'string') return datos.error;
        if (datos && typeof datos.mensaje === 'string') return datos.mensaje;
        return `La API respondió con un error (${error.response.status}).`;
    }
    if (error.code === 'ECONNABORTED') {
        return 'La API tardó demasiado en responder. Intenta nuevamente.';
    }
    return 'No fue posible contactar la API. Revisa la conexión, la URL y CORS.';
}

// Ejecuta una petición y convierte cualquier fallo en un Error con mensaje legible.
// Las cancelaciones (AbortController) se dejan pasar tal cual para poder ignorarlas.
export async function pedir(peticion) {
    try {
        const respuesta = await peticion;
        return respuesta.data;
    } catch (error) {
        if (axios.isCancel(error)) throw error;
        throw new Error(obtenerMensajeError(error));
    }
}

export function conToken(token) {
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}
