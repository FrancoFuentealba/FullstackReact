// Pedidos: todo pasa por la API con Axios. No se guarda nada en localStorage.
import { api, pedir, conToken } from './api.js';
import {
    crearPedidoRequestDto,
    pedidoCreadoDesdeApiDto,
    pedidoDesdeApiDto,
} from '../dto/pedido.dto.js';

function exigirToken(token, mensaje) {
    if (!token) throw new Error(mensaje);
}

// El backend vuelve a validar productos, precios y stock (409 si no alcanza el stock).
export async function crearPedidoDesdeAPI({ items, cliente, token, email }) {
    exigirToken(token, 'Inicia sesión antes de confirmar la compra');

    const resultado = await pedir(api.post(
        '/pedidos',
        crearPedidoRequestDto({ items, cliente }),
        conToken(token),
    ));

    return pedidoCreadoDesdeApiDto(resultado.pedido, { cliente, email });
}

// Solo los pedidos del usuario autenticado.
export async function listarMisPedidosDesdeAPI(token, email) {
    exigirToken(token, 'Inicia sesión para consultar tus pedidos');

    const resultado = await pedir(api.get('/pedidos/mios', conToken(token)));
    return (resultado.pedidos ?? []).map((pedido) => pedidoDesdeApiDto(pedido, email));
}

// Todos los pedidos (admin y vendedor). La API verifica el rol.
export async function listarPedidosAdminDesdeAPI(token) {
    exigirToken(token, 'Inicia sesión como administrador');

    const resultado = await pedir(api.get('/pedidos/admin', conToken(token)));
    return (resultado.pedidos ?? []).map((pedido) => pedidoDesdeApiDto(pedido));
}

export async function actualizarEstadoPedidoEnAPI(id, estado, token) {
    exigirToken(token, 'Inicia sesión como administrador');

    const resultado = await pedir(api.patch(
        `/pedidos/${encodeURIComponent(id)}/estado`,
        { estado },
        conToken(token),
    ));
    return resultado.pedido;
}

// Detalle de un pedido (GET /pedidos/:id). El dueño, un vendedor o un administrador pueden verlo;
// la API responde 403 a otro cliente y 404 si el pedido no existe.
export async function obtenerPedidoDesdeAPI(id, token) {
    exigirToken(token, 'Inicia sesión para consultar el pedido');

    const resultado = await pedir(api.get(`/pedidos/${encodeURIComponent(id)}`, conToken(token)));
    return pedidoDesdeApiDto(resultado.pedido);
}
