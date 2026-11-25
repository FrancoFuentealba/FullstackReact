// DTO de salida: usuario de la API → formato de la interfaz.
export function usuarioDesdeApiDto(usuario) {
    return {
        id: String(usuario.id),
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        activo: Boolean(usuario.activo),
        creadoEn: usuario.creado_en,
    };
}

// DTO de entrada: solo viajan los campos que el administrador puede cambiar.
export function actualizarUsuarioRequestDto({ nombre, email, rol, activo }) {
    const dto = {};
    if (nombre !== undefined) dto.nombre = String(nombre).trim();
    if (email !== undefined) dto.email = String(email).trim().toLowerCase();
    if (rol !== undefined) dto.rol = rol;
    if (activo !== undefined) dto.activo = Boolean(activo);
    return dto;
}
