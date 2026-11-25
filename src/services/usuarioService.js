// Gestión de usuarios (solo administrador). La API valida el rol con el JWT.
import { api, pedir, conToken } from './api.js';
import { usuarioDesdeApiDto, actualizarUsuarioRequestDto } from '../dto/usuario.dto.js';

function exigirToken(token) {
    if (!token) throw new Error('Inicia sesión como administrador');
}

// GET /usuarios
export async function listarUsuariosDesdeAPI(token) {
    exigirToken(token);
    const resultado = await pedir(api.get('/usuarios', conToken(token)));
    return (resultado.usuarios ?? []).map(usuarioDesdeApiDto);
}

// PATCH /usuarios/:id  (nombre, correo, rol y estado)
export async function actualizarUsuarioEnAPI(id, cambios, token) {
    exigirToken(token);
    const resultado = await pedir(api.patch(
        `/usuarios/${encodeURIComponent(id)}`,
        actualizarUsuarioRequestDto(cambios),
        conToken(token),
    ));
    return usuarioDesdeApiDto(resultado.usuario);
}

// DELETE /usuarios/:id  (desactiva la cuenta; no borra la fila)
export async function desactivarUsuarioEnAPI(id, token) {
    exigirToken(token);
    const resultado = await pedir(api.delete(`/usuarios/${encodeURIComponent(id)}`, conToken(token)));
    return usuarioDesdeApiDto(resultado.usuario);
}
