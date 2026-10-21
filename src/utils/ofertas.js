export function tieneOferta(producto) {
    return Number(producto.descuento) > 0;
}

export function precioFinal(producto) {
    if (!tieneOferta(producto)) return producto.precio;
    return Math.round(producto.precio * (1 - producto.descuento / 100));
}