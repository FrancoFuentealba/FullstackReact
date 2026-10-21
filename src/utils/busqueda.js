// Pasa a minúsculas y quita las tildes: "Micrófono" -> "microfono"
function normalizar(texto) {
    return String(texto ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Devuelve los productos que contienen TODAS las palabras buscadas
// en su nombre, marca, modelo, categoría o código.
export function filtrarProductos(productos, termino) {
    const palabras = normalizar(termino).split(' ').filter((p) => p !== '');
    if (palabras.length === 0) return [];

    return productos.filter((p) => {
        const texto = normalizar(`${p.nombre} ${p.marca} ${p.modelo} ${p.categoria} ${p.codigo}`);
        return palabras.every((palabra) => texto.includes(palabra));
    });
}