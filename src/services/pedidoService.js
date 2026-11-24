// Pedidos: todo pasa por la API. No se guarda nada en localStorage.
const API = `${import.meta.env.VITE_API_URL ?? ''}/api/v1`;

// Envía una compra a la API. El backend vuelve a validar productos,
// precios y stock; el frontend no envía el total calculado.
export async function crearPedidoDesdeAPI({ items, cliente, token, email }) {
    if (!token) {
        throw new Error('Inicia sesión antes de confirmar la compra');
    }

    const respuesta = await fetch(`${API}/pedidos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            cliente: {
                nombre: cliente?.nombre,
                direccion: cliente?.direccion,
            },
            items: items.map((item) => ({
                codigo: item.producto.codigo,
                cantidad: item.cantidad,
            })),
        }),
    });

    const resultado = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(resultado.error || 'No se pudo registrar la compra');
    }

    const pedido = resultado.pedido;

    return {
        id: pedido.id,
        fecha: pedido.fecha,
        estado: pedido.estado,
        usuario: email,
        cliente: {
            nombre: cliente.nombre,
            direccion: cliente.direccion,
        },
        lineas: pedido.lineas.map((linea) => ({
            codigo: linea.codigo,
            nombre: linea.nombre,
            precio: linea.precio_unitario_clp,
            cantidad: linea.cantidad,
            subtotal: linea.subtotal_clp,
        })),
        total: pedido.total_clp,
    };
}

// Consulta solo los pedidos del usuario autenticado.
export async function listarMisPedidosDesdeAPI(token, email) {
    if (!token) {
        throw new Error('Inicia sesión para consultar tus pedidos');
    }

    const respuesta = await fetch(`${API}/pedidos/mios`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const resultado = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(resultado.error || 'No se pudieron cargar tus pedidos');
    }

    return (resultado.pedidos ?? []).map((pedido) => ({
        id: String(pedido.id),
        fecha: pedido.fecha,
        estado: pedido.estado,
        total: Number(pedido.total_clp),
        usuario: email,
        cliente: {
            nombre: pedido.nombre_destinatario,
            direccion: pedido.direccion_entrega,
        },
        lineas: pedido.lineas.map((linea) => ({
            codigo: linea.codigo,
            nombre: linea.nombre,
            cantidad: Number(linea.cantidad),
            precio: Number(linea.precio_unitario_clp),
            subtotal: Number(linea.subtotal_clp),
        })),
    }));
}

// Devuelve todos los pedidos para el panel administrativo.
// La API verifica que el token pertenezca a un administrador.
export async function listarPedidosAdminDesdeAPI(token) {
    if (!token) {
        throw new Error('Inicia sesión como administrador');
    }

    const respuesta = await fetch(`${API}/pedidos/admin`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const resultado = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(resultado.error || 'No se pudieron cargar los pedidos');
    }

    return (resultado.pedidos ?? []).map((pedido) => ({
        id: String(pedido.id),
        fecha: pedido.fecha,
        estado: pedido.estado,
        usuario: pedido.usuario,
        total: Number(pedido.total_clp),
        cliente: {
            nombre: pedido.nombre_destinatario,
            direccion: pedido.direccion_entrega,
        },
        lineas: pedido.lineas.map((linea) => ({
            codigo: linea.codigo,
            nombre: linea.nombre,
            cantidad: Number(linea.cantidad),
            precio: Number(linea.precio_unitario_clp),
            subtotal: Number(linea.subtotal_clp),
        })),
    }));
}

// Actualiza el estado de un pedido. La API aplica el control de rol.
export async function actualizarEstadoPedidoEnAPI(id, estado, token) {
    if (!token) {
        throw new Error('Inicia sesión como administrador');
    }

    const respuesta = await fetch(`${API}/pedidos/${encodeURIComponent(id)}/estado`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado }),
    });
    const resultado = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(resultado.error || 'No se pudo actualizar el pedido');
    }

    return resultado.pedido;
}
