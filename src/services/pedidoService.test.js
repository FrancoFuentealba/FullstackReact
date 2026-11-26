import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock('./api.js', async (original) => ({
    ...(await original()),
    api: { get: mocks.get },
}));

import { obtenerPedidoDesdeAPI } from './pedidoService';

const pedidoApi = {
    id: 7,
    fecha: '2026-11-20T15:00:00.000Z',
    estado: 'preparacion',
    total_clp: '31800',
    nombre_destinatario: 'Ana',
    direccion_entrega: 'Calle 123',
    usuario: 'ana@correo.cl',
    lineas: [
        { codigo: 'ACC-001', nombre: 'Afinador', cantidad: 2, precio_unitario_clp: 15900, subtotal_clp: 31800 },
    ],
};

describe('obtenerPedidoDesdeAPI', () => {
    beforeEach(() => {
    mocks.get.mockReset();
    });

    it('consulta GET /pedidos/:id con el token y convierte la respuesta', async () => {
        mocks.get.mockResolvedValue({ data: { pedido: pedidoApi } });

        const pedido = await obtenerPedidoDesdeAPI(7, 'token-ficticio');

        expect(mocks.get).toHaveBeenCalledWith('/pedidos/7', {
            headers: { Authorization: 'Bearer token-ficticio' },
        });
        expect(pedido).toMatchObject({
            id: '7',
            estado: 'preparacion',
            total: 31800,
            usuario: 'ana@correo.cl',
            cliente: { nombre: 'Ana', direccion: 'Calle 123' },
        });
        expect(pedido.lineas[0]).toMatchObject({ codigo: 'ACC-001', cantidad: 2, precio: 15900, subtotal: 31800 });
    });

    it('muestra el mensaje de la API si no tiene permiso (403)', async () => {
        mocks.get.mockRejectedValue({ response: { status: 403, data: { error: 'No tienes permiso para ver este pedido' } } });

        await expect(obtenerPedidoDesdeAPI(7, 'token-ficticio')).rejects.toThrow('No tienes permiso para ver este pedido');
    });

    it('sin token no llama a la API', async () => {
        await expect(obtenerPedidoDesdeAPI(7, null)).rejects.toThrow('Inicia sesión');
        expect(mocks.get).not.toHaveBeenCalled();
    });
});
