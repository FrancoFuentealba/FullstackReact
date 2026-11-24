// DTO de entrada: formato de la interfaz → contrato de la API.
export function crearProductoRequestDto(datos) {
    return {
        codigo: String(datos.codigo ?? '').trim().toUpperCase(),
        categoria: String(datos.categoria ?? '').trim(),
        nombre: String(datos.nombre ?? '').trim(),
        marca: String(datos.marca ?? '').trim(),
        modelo: String(datos.modelo ?? '').trim(),
        stock: Number(datos.stock),
        precio_clp: Number(datos.precio_clp ?? datos.precio),
        descuento_pct: Number(datos.descuento_pct ?? datos.descuento ?? 0),
        imagen_url: String(datos.imagen_url ?? datos.imagen ?? '').trim(),
    };
}

// DTO de salida: nombres de PostgreSQL → nombres que usa la interfaz.
export function productoDesdeApiDto(producto) {
    return {
        ...producto,
        precio: Number(producto.precio_clp),
        descuento: Number(producto.descuento_pct),
        imagen: producto.imagen_url,
    };
}
