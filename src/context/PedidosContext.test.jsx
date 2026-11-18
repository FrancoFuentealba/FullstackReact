import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { PedidosProvider, usePedidos } from './PedidosContext';

const estado = vi.hoisted(() => ({
    usuario: null,
    token: 'token-ficticio',
    items: [],
}));

const mocks = vi.hoisted(() => ({
    listarMisPedidosDesdeAPI: vi.fn(),
    listarPedidosAdminDesdeAPI: vi.fn(),
    actualizarEstadoPedidoEnAPI: vi.fn(),
    crearPedidoDesdeAPI: vi.fn(),
    recargarDesdeAPI: vi.fn(),
    vaciar: vi.fn(),
}));

vi.mock('../services/pedidoService', () => ({
    listarMisPedidosDesdeAPI: mocks.listarMisPedidosDesdeAPI,
    listarPedidosAdminDesdeAPI: mocks.listarPedidosAdminDesdeAPI,
    actualizarEstadoPedidoEnAPI: mocks.actualizarEstadoPedidoEnAPI,
    crearPedidoDesdeAPI: mocks.crearPedidoDesdeAPI,
}));

vi.mock('../services/authService', () => ({
    obtenerToken: () => estado.token,
}));

vi.mock('./AuthContext', () => ({
    useAuth: () => ({ usuario: estado.usuario }),
}));

vi.mock('./CarritoContext', () => ({
    useCarrito: () => ({ items: estado.items, vaciar: mocks.vaciar }),
}));

vi.mock('./ProductosContext', () => ({
    useProductos: () => ({ recargarDesdeAPI: mocks.recargarDesdeAPI }),
}));

const pedido = {
    id: '12',
    fecha: '2026-11-18T12:00:00.000Z',
    estado: 'preparacion',
    usuario: 'ana@correo.cl',
    total: 15900,
    cliente: { nombre: 'Ana Pérez', direccion: 'Calle 1' },
    lineas: [{
        codigo: 'ACC-001',
        nombre: 'Afinador',
        cantidad: 1,
        precio: 15900,
        subtotal: 15900,
    }],
};

const cliente = {
    nombre: 'Ana Pérez',
    direccion: 'Calle 1',
    tarjetaFinal: '4242',
};

const wrapper = ({ children }) => (
    <PedidosProvider>{children}</PedidosProvider>
);

describe('PedidosContext conectado a la API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        estado.usuario = null;
        estado.token = 'token-ficticio';
        estado.items = [{
            producto: { codigo: 'ACC-001', nombre: 'Afinador' },
            cantidad: 1,
        }];
        mocks.listarMisPedidosDesdeAPI.mockResolvedValue([]);
        mocks.listarPedidosAdminDesdeAPI.mockResolvedValue([]);
        mocks.crearPedidoDesdeAPI.mockResolvedValue(pedido);
        mocks.actualizarEstadoPedidoEnAPI.mockResolvedValue({
            id: '12',
            estado: 'entregado',
            total_clp: 15900,
        });
        mocks.recargarDesdeAPI.mockResolvedValue([]);
    });

    it('envía la compra a la API, vacía el carrito y añade la respuesta', async () => {
        estado.usuario = {
            id: '3',
            nombre: 'Ana Pérez',
            email: 'ana@correo.cl',
            rol: 'cliente',
        };

        const { result } = renderHook(() => usePedidos(), { wrapper });

        await waitFor(() => {
            expect(mocks.listarMisPedidosDesdeAPI).toHaveBeenCalledWith(
                'token-ficticio',
                'ana@correo.cl',
            );
        });

        let respuesta;
        await act(async () => {
            respuesta = await result.current.confirmarCompra(cliente);
        });

        expect(respuesta).toEqual({ ok: true, pedido });
        expect(mocks.crearPedidoDesdeAPI).toHaveBeenCalledWith({
            items: estado.items,
            cliente,
            token: 'token-ficticio',
            email: 'ana@correo.cl',
        });
        expect(mocks.vaciar).toHaveBeenCalledOnce();
        expect(mocks.recargarDesdeAPI).toHaveBeenCalled();
        expect(result.current.pedidos).toEqual([pedido]);
    });

    it('si la API rechaza la compra, informa el error y conserva el carrito', async () => {
        mocks.crearPedidoDesdeAPI.mockRejectedValue(
            new Error('Stock insuficiente para Afinador'),
        );

        const { result } = renderHook(() => usePedidos(), { wrapper });

        let respuesta;
        await act(async () => {
            respuesta = await result.current.confirmarCompra(cliente);
        });

        expect(respuesta).toEqual({
            ok: false,
            error: 'Stock insuficiente para Afinador',
        });
        expect(mocks.vaciar).not.toHaveBeenCalled();
        expect(result.current.pedidos).toEqual([]);
    });

    it('carga desde la API los pedidos del cliente autenticado', async () => {
        estado.usuario = {
            id: '3',
            nombre: 'Ana Pérez',
            email: 'ana@correo.cl',
            rol: 'cliente',
        };
        mocks.listarMisPedidosDesdeAPI.mockResolvedValue([pedido]);

        const { result } = renderHook(() => usePedidos(), { wrapper });

        await waitFor(() => {
            expect(result.current.misPedidos).toEqual([pedido]);
        });
    });

    it('envía el cambio de estado al servicio administrativo', async () => {
        const { result } = renderHook(() => usePedidos(), { wrapper });

        let respuesta;
        await act(async () => {
            respuesta = await result.current.cambiarEstado('12', 'entregado');
        });

        expect(respuesta).toEqual({ ok: true });
        expect(mocks.actualizarEstadoPedidoEnAPI).toHaveBeenCalledWith(
            '12',
            'entregado',
            'token-ficticio',
        );
    });
});
