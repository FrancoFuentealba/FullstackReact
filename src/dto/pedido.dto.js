// DTO de entrada: el frontend solo envía código y cantidad; el backend recalcula precios y total.
export function crearPedidoRequestDto({ items, cliente }) {
    return {
        cliente: {
            nombre: cliente?.nombre,
            direccion: cliente?.direccion,
        },
        items: items.map((item) => ({
            codigo: item.producto.codigo,
            cantidad: item.cantidad,
        })),
    };
}

function lineaDesdeApiDto(linea) {
    return {
        codigo: linea.codigo,
        nombre: linea.nombre,
        cantidad: Number(linea.cantidad),
        precio: Number(linea.precio_unitario_clp),
        subtotal: Number(linea.subtotal_clp),
    };
}

// DTO de salida para listados (mis pedidos y panel interno).
export function pedidoDesdeApiDto(pedido, usuario = pedido.usuario) {
    return {
        id: String(pedido.id),
        fecha: pedido.fecha,
        estado: pedido.estado,
        usuario,
        total: Number(pedido.total_clp),
        cliente: {
            nombre: pedido.nombre_destinatario,
            direccion: pedido.direccion_entrega,
        },
        lineas: (pedido.lineas ?? []).map(lineaDesdeApiDto),
    };
}

// DTO de salida del pedido recién creado (la API lo devuelve sin nombre_destinatario).
export function pedidoCreadoDesdeApiDto(pedido, { cliente, email }) {
    return {
        id: pedido.id,
        fecha: pedido.fecha,
        estado: pedido.estado,
        usuario: email,
        cliente: { nombre: cliente.nombre, direccion: cliente.direccion },
        lineas: pedido.lineas.map(lineaDesdeApiDto),
        total: pedido.total_clp,
    };
}
