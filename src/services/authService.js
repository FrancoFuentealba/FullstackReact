let usuarioActual = null;
let accessTokenActual = null;

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

    const resultado = await solicitarAuth('/api/auth/register', datos);
    return resultado.usuario;
}

export async function iniciarSesion(email, clave) {
    const resultado = await solicitarAuth('/api/auth/login', {
        email: limpiarEmail(email),
        password: String(clave ?? ''),
    });

    accessTokenActual = resultado.accessToken;
    usuarioActual = resultado.usuario;

    return usuarioActual;
}

export function obtenerToken() {
    return accessTokenActual;
}

export function cerrarSesion() {
    accessTokenActual = null;
    usuarioActual = null;
}

export function obtenerSesion() {
    return usuarioActual;
}
