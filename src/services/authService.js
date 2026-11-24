const API = `${import.meta.env.VITE_API_URL ?? ''}/api/v1`;

// Sesión en sessionStorage: sobrevive a recargar la página, pero se borra al cerrar la pestaña
// (más seguro que localStorage) y al cerrar sesión o al expirar el token (JWT de 1 hora).
const CLAVE_SESION = 'sesion';

function leerSesion() {
    try {
        const { token, usuario, exp } = JSON.parse(sessionStorage.getItem(CLAVE_SESION));
        if (!token || !usuario || (exp && exp * 1000 <= Date.now())) throw new Error('vencida');
        return { token, usuario };
    } catch {
        try { sessionStorage.removeItem(CLAVE_SESION); } catch { /* sin almacenamiento */ }
        return { token: null, usuario: null };
    }
}

function expiracion(token) {
    try {
        return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).exp;
    } catch {
        return null;
    }
}

let { token: accessTokenActual, usuario: usuarioActual } = leerSesion();

function limpiarEmail(email) {
    return String(email ?? '').trim().toLowerCase();
}

async function solicitarAuth(ruta, datos) {
    const respuesta = await fetch(ruta, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
    });

    const resultado = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(resultado.error || 'No se pudo completar la solicitud');
    }

    return resultado;
}

export async function registrarUsuario({ nombre, email, clave }) {
    const datos = {
        nombre: String(nombre ?? '').trim(),
        email: limpiarEmail(email),
        password: String(clave ?? ''),
    };

    if (!datos.nombre || !datos.email || !datos.password) {
        throw new Error('Nombre, correo y contraseña son obligatorios');
    }

    const resultado = await solicitarAuth(`${API}/auth/register`, datos);
    return resultado.usuario;
}

export async function iniciarSesion(email, clave) {
    const resultado = await solicitarAuth(`${API}/auth/login`, {
        email: limpiarEmail(email),
        password: String(clave ?? ''),
    });

    accessTokenActual = resultado.accessToken;
    usuarioActual = resultado.usuario;
    try {
        sessionStorage.setItem(CLAVE_SESION, JSON.stringify({
            token: accessTokenActual,
            usuario: usuarioActual,
            exp: expiracion(accessTokenActual),
        }));
    } catch { /* sin almacenamiento: la sesión queda solo en memoria */ }

    return usuarioActual;
}

export function obtenerToken() {
    if (accessTokenActual) {
        const exp = expiracion(accessTokenActual);
        if (exp && exp * 1000 <= Date.now()) cerrarSesion();
    }
    return accessTokenActual;
}

export function cerrarSesion() {
    accessTokenActual = null;
    usuarioActual = null;
    try { sessionStorage.removeItem(CLAVE_SESION); } catch { /* nada que borrar */ }
}

export function obtenerSesion() {
    obtenerToken(); // si el token expiró, limpia la sesión
    return usuarioActual;
}
