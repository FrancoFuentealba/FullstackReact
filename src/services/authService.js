import { api, pedir } from './api.js';
import { crearLoginRequestDto, crearRegistroRequestDto } from '../dto/auth.dto.js';
import { guardarSesion } from './sesion.js';

// La sesión (token + usuario) vive en sesion.js; aquí se reexporta para el resto de la app.
export { obtenerToken, obtenerSesion, cerrarSesion } from './sesion.js';

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
