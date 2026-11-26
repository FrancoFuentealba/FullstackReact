// Sesión del usuario (token JWT + datos). Se guarda en sessionStorage:
// sobrevive a recargar la página, pero se borra al cerrar la pestaña, al cerrar sesión
// y cuando el token expira (el backend firma el JWT por 1 hora).
const CLAVE_SESION = 'sesion';

function expiracion(token) {
    try {
        const carga = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(carga)).exp ?? null;
    } catch {
        return null;
    }
}

function leer() {
    try {
        const { token, usuario } = JSON.parse(sessionStorage.getItem(CLAVE_SESION));
        if (!token || !usuario) throw new Error('sesión incompleta');
        return { token, usuario };
    } catch {
        return { token: null, usuario: null };
    }
}

let { token: tokenActual, usuario: usuarioActual } = leer();

// La interfaz se suscribe para enterarse cuando la sesión se cierra o cambia por su cuenta
// (token vencido, cuenta desactivada, rol modificado), y así no queda mostrando datos viejos.
const oyentes = new Set();

export function alCambiarSesion(oyente) {
    oyentes.add(oyente);
    return () => oyentes.delete(oyente);
}

function avisar() {
    oyentes.forEach((oyente) => oyente(usuarioActual));
}

export function guardarSesion(token, usuario) {
    tokenActual = token;
    usuarioActual = usuario;
    try {
        sessionStorage.setItem(CLAVE_SESION, JSON.stringify({ token, usuario }));
    } catch { /* sin almacenamiento: la sesión queda solo en memoria */ }
}

export function cerrarSesion() {
    tokenActual = null;
    usuarioActual = null;
    try { sessionStorage.removeItem(CLAVE_SESION); } catch { /* nada que borrar */ }
    avisar();
}

// Reemplaza los datos del usuario guardados (por ejemplo, si un administrador le cambió el rol).
export function actualizarUsuarioSesion(usuario) {
    if (!tokenActual) return;
    guardarSesion(tokenActual, usuario);
    avisar();
}

function vencida() {
    const exp = tokenActual ? expiracion(tokenActual) : null;
    return exp !== null && exp * 1000 <= Date.now();
}

export function obtenerToken() {
    if (tokenActual && vencida()) cerrarSesion();
    return tokenActual;
}

export function obtenerSesion() {
    obtenerToken(); // si el token venció, limpia la sesión
    return usuarioActual;
}
