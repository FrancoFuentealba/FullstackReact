import axios from 'axios';

export const CLAVE_TOKEN = 'audiomax_token';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
});

// Adjunta el JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(CLAVE_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// los 3 casos de error de Axios (respuesta HTTP, timeout, sin respuesta)
export function obtenerMensajeError(error) {
  if (error.response) {
    const datos = error.response.data;
    if (datos && typeof datos.error === 'string') {
      return datos.error;
    }
    if (datos && typeof datos.mensaje === 'string') {
      return datos.mensaje;
    }
    return `La API respondió con un error (${error.response.status}).`;
  }
  if (error.code === 'ECONNABORTED') {
    return 'La API tardó demasiado en responder. Intenta nuevamente.';
  }
  return 'No fue posible contactar la API. Revisa la conexión, la URL y CORS.';
}
