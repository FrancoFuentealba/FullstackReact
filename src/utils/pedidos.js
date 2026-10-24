// Lógica de los pedidos
import { precioFinal } from './ofertas';
// Etapas de un pedido, en orden
export const ESTADOS_PEDIDO = ['preparacion', 'despachado', 'entregado'];

// Texto que ve la persona para cada etapa.
export const ETIQUETAS_ESTADO = {
    preparacion: 'En preparación',
    despachado: 'Despachado',
    entregado: 'Entregado',
};

// Revisa los items del carrito contra los productos ACTUALES del catálogo.
// El carrito guarda una copia del producto de cuando se agregó; puede estar desactualizada
// (otro cliente compró, el administrador cambió el precio o eliminó el producto).

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

// Suma los subtotales de las líneas de un pedido
export function calcularTotalPedido(lineas) {
    return lineas.reduce((suma, linea) => suma + linea.subtotal, 0);
}

// Deja solo los pedidos de un cliente
export function filtrarPorUsuario(pedidos, email) {
    if (!email) return [];
    const buscado = String(email).trim().toLowerCase();
    return pedidos.filter((pedido) => String(pedido.usuario ?? '').toLowerCase() === buscado);
}