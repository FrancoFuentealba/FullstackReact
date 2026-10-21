// Lógica de los pedidos como FUNCIONES PURAS (sin React ni localStorage): se prueban solas.
import { precioFinal } from './ofertas';
// Etapas de un pedido, en orden. Coinciden con las claves de la molécula EstadoPedido.
export const ESTADOS_PEDIDO = ['preparacion', 'despachado', 'entregado'];

// Revisa los items del carrito contra los productos ACTUALES del catálogo.
// El carrito guarda una copia del producto de cuando se agregó; puede estar desactualizada
// (otro cliente compró, el administrador cambió el precio o eliminó el producto).
// Devuelve:
//   lineas    → lo que sí se puede vender, con el PRECIO ACTUAL
//   problemas → mensajes de lo que no se puede vender (producto eliminado o sin stock suficiente)
export function revisarItems(items, productos) {
    const lineas = [];
    const problemas = [];

    for (const item of items) {
        const actual = productos.find((p) => p.codigo === item.producto.codigo);

        if (!actual) {
            problemas.push(`${item.producto.nombre} ya no está disponible`);
        } else if (actual.stock <= 0) {
            problemas.push(`${actual.nombre} está agotado`);
        } else if (actual.stock < item.cantidad) {
            const cuantas = actual.stock === 1 ? 'solo queda 1 unidad' : `solo quedan ${actual.stock} unidades`;
            problemas.push(`${actual.nombre}: ${cuantas}`);
        } else {
            const precio = precioFinal(actual);
            lineas.push({
                codigo: actual.codigo,
                nombre: actual.nombre,
                precio: precio,
                cantidad: item.cantidad,
                subtotal: precio * item.cantidad,
            });
        }
    }

    return { lineas, problemas };
}

// Suma los subtotales de las líneas de un pedido.
export function calcularTotalPedido(lineas) {
    return lineas.reduce((suma, linea) => suma + linea.subtotal, 0);
}

// Deja solo los pedidos de un cliente (compara el correo sin distinguir mayúsculas).
export function filtrarPorUsuario(pedidos, email) {
    if (!email) return [];
    const buscado = String(email).trim().toLowerCase();
    return pedidos.filter((pedido) => String(pedido.usuario ?? '').toLowerCase() === buscado);
}
