import { hayStock } from './stock';
import { precioFinal } from './ofertas';

// Sube en 1 la cantidad del producto, sin pasar del stock disponible
export function sumarItem(items, codigo) {
    return items.map((item) =>
        item.producto.codigo === codigo && item.cantidad < item.producto.stock
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
    );
}

// Agrega un producto, si no tiene stock no hace nada
export function agregarItem(items, producto) {
    if (!hayStock(producto)) return items;

    const yaEsta = items.some((item) => item.producto.codigo === producto.codigo);
    if (yaEsta) return sumarItem(items, producto.codigo);

    return [...items, { producto, cantidad: 1 }];
}

// Baja en 1 la cantidad del producto, si llega a 0 el producto sale del carrito
export function restarItem(items, codigo) {
    return items
        .map((item) =>
            item.producto.codigo === codigo
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
        )
        .filter((item) => item.cantidad > 0);
}

// Saca el producto del carrito
export function quitarItem(items, codigo) {
    return items.filter((item) => item.producto.codigo !== codigo);
}

// Suma el precio final (con descuento si hay oferta) × cantidad de todos los items
export function calcularTotal(items) {
    return items.reduce((suma, item) => suma + precioFinal(item.producto) * item.cantidad, 0);
}

// Cuenta las unidades del carrito
export function calcularCantidadTotal(items) {
    return items.reduce((suma, item) => suma + item.cantidad, 0);
}

// Deja solo los items con la forma correcta. Sirve para revisar lo que viene de localStorage
export function limpiarCarrito(lista) {
    if (!Array.isArray(lista)) return [];
    return lista.filter(
        (item) =>
            item &&
            item.producto &&
            item.producto.codigo &&
            Number.isInteger(item.cantidad) &&
            item.cantidad > 0
    );
}