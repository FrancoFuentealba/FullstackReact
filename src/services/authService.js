// authService: usuarios y sesión. JavaScript puro (sin React), con localStorage.
// OJO: guardar claves en el navegador es solo para este proyecto (no hay backend).
// En un sistema real las claves se guardan cifradas en un servidor.
import { api, CLAVE_TOKEN, obtenerMensajeError } from './api.js';
import { crearLoginRequestDto, crearRegistroRequestDto } from '../dto/auth.dto.js';

const CLAVE_SESION = 'sesion';

export async function registrarUsuario(datosFormulario) {
  const dto = crearRegistroRequestDto(datosFormulario);
  try {
    const respuesta = await api.post('/auth/register', dto);
    return respuesta.data.usuario;
  } catch (error) {
    throw new Error(obtenerMensajeError(error));
  }
}

export async function iniciarSesion(email, clave) {
  const dto = crearLoginRequestDto({ email, clave });
  try {
    const respuesta = await api.post('/auth/login', dto);
    const { accessToken, usuario } = respuesta.data;

    localStorage.setItem(CLAVE_TOKEN, accessToken);
    localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
    return usuario;
  } catch (error) {
    throw new Error(obtenerMensajeError(error));
  }
}

export async function verificarSesionActual() {
  const token = obtenerToken();
  if (!token) return null;

  try {
    const respuesta = await api.get('/auth/me');
    const { usuario } = respuesta.data;
    localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
    return usuario;
  } catch (error) {
    // Si el token venció o la cuenta fue desactivada (401), se limpia la sesión
    if (error.response?.status === 401) {
      cerrarSesion();
      return null;
    }
    throw error;
  }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_TOKEN);
  localStorage.removeItem(CLAVE_SESION);
}

export function obtenerToken() {
  return localStorage.getItem(CLAVE_TOKEN);
}

export function obtenerSesion() {
  try {
    const token = obtenerToken();
    if (!token) return null;
    const sesion = JSON.parse(localStorage.getItem(CLAVE_SESION));
    return sesion && sesion.email && sesion.rol ? sesion : null;
  } catch {
    return null;
  }
}
