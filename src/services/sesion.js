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
