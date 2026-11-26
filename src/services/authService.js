import { api, pedir, conToken } from './api.js';
import { crearLoginRequestDto, crearRegistroRequestDto } from '../dto/auth.dto.js';
import { guardarSesion, actualizarUsuarioSesion, cerrarSesion, obtenerToken, obtenerSesion } from './sesion.js';

// La sesión (token + usuario) vive en sesion.js; aquí se reexporta para el resto de la app.
export { obtenerToken, obtenerSesion, cerrarSesion, alCambiarSesion } from './sesion.js';

export async function registrarUsuario(datosFormulario) {
    const dto = crearRegistroRequestDto(datosFormulario);

    if (!dto.nombre || !dto.email || !dto.password) {
        throw new Error('Nombre, correo y contraseña son obligatorios');
    }

    const resultado = await pedir(api.post('/auth/register', dto));
    return resultado.usuario;
}

export async function iniciarSesion(email, clave) {
    const resultado = await pedir(api.post('/auth/login', crearLoginRequestDto({ email, clave })));

    guardarSesion(resultado.accessToken, resultado.usuario);
    return resultado.usuario;
}

// Comprueba con el servidor que la sesión guardada sigue siendo válida (se llama al abrir o recargar la app).
//  - Cuenta desactivada o token inválido: la API responde 401 y el interceptor de api.js cierra la sesión.
//  - Rol o nombre cambiados por un administrador: se actualizan los datos guardados.
//  - Sin conexión u otro error: la sesión se conserva (no se cierra por una falla de red).
export async function verificarSesion() {
    const token = obtenerToken();
    const guardado = obtenerSesion();
    if (!token || !guardado) return null;

    try {
        const resultado = await pedir(api.get(`/usuarios/${encodeURIComponent(guardado.id)}`, conToken(token)));
        const actual = { ...guardado, nombre: resultado.usuario.nombre, email: resultado.usuario.email, rol: resultado.usuario.rol };
        actualizarUsuarioSesion(actual);
        return actual;
    } catch (error) {
        // 401: la cuenta fue desactivada o el token ya no sirve → se cierra la sesión.
        if (error.status === 401) cerrarSesion();
        return obtenerSesion();
    }
}
