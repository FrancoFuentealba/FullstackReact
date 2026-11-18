import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PedidosProvider } from '../context/PedidosContext';
import PaginaAdminPedidos from './AdminPedidos';

const mocks = vi.hoisted(() => ({
    usuario: {
        id: '1',
        nombre: 'Admin',
        email: 'admin@audiomax.cl',
        rol: 'admin',
    },
    listarPedidosAdminDesdeAPI: vi.fn(),
    actualizarEstadoPedidoEnAPI: vi.fn(),
    crearPedidoDesdeAPI: vi.fn(),
    listarMisPedidosDesdeAPI: vi.fn(),
    vaciar: vi.fn(),
    recargarDesdeAPI: vi.fn(),
}));

vi.mock('../context/AuthContext', () => ({
    AuthProvider: ({ children }) => children,
    useAuth: () => ({
        usuario: mocks.usuario,
        esAdmin: mocks.usuario?.rol === 'admin',
        cerrar: vi.fn(),
    }),
}));

vi.mock('../context/ProductosContext', () => ({
    ProductosProvider: ({ children }) => children,
    useProductos: () => ({ recargarDesdeAPI: mocks.recargarDesdeAPI }),
}));

vi.mock('../context/CarritoContext', () => ({
    CarritoProvider: ({ children }) => children,
    useCarrito: () => ({ items: [], vaciar: mocks.vaciar }),
}));

vi.mock('../services/authService', () => ({
    obtenerToken: () => 'token-admin-ficticio',
}));

vi.mock('../services/pedidoService', () => ({
    listarPedidosAdminDesdeAPI: mocks.listarPedidosAdminDesdeAPI,
    actualizarEstadoPedidoEnAPI: mocks.actualizarEstadoPedidoEnAPI,
    crearPedidoDesdeAPI: mocks.crearPedidoDesdeAPI,
    listarMisPedidosDesdeAPI: mocks.listarMisPedidosDesdeAPI,
}));

function mostrarPagina() {
    return render(
        <MemoryRouter initialEntries={['/admin/pedidos']}>
            <PedidosProvider>
                <PaginaAdminPedidos />
            </PedidosProvider>
        </MemoryRouter>,
    );
}

const pedidoPrueba = {
    id: 'PED-DB-1',
    fecha: '2026-11-18T12:00:00.000Z',
    estado: 'preparacion',
    usuario: 'ana@example.com',
    total: 15900,
    cliente: {
        nombre: 'Ana Pérez',
        direccion: 'Calle 1',
    },
    lineas: [{
        codigo: 'ACC-001',
        nombre: 'Afinador Cromático de Clip',
        cantidad: 1,
        precio: 15900,
        subtotal: 15900,
    }],
};

describe('PaginaAdminPedidos conectada a la API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mocks.usuario = {
            id: '1',
            nombre: 'Admin',
            email: 'admin@audiomax.cl',
            rol: 'admin',
        };
        mocks.listarPedidosAdminDesdeAPI.mockResolvedValue([]);
        mocks.actualizarEstadoPedidoEnAPI.mockResolvedValue({
            id: '1',
            fecha: pedidoPrueba.fecha,
            estado: 'entregado',
            total_clp: 15900,
        });
    });

    it('muestra un mensaje cuando la API no tiene pedidos', async () => {
        mostrarPagina();

        expect(await screen.findByText('Aún no hay pedidos.')).toBeInTheDocument();
        expect(mocks.listarPedidosAdminDesdeAPI)
            .toHaveBeenCalledWith('token-admin-ficticio');
    });

    it('lista pedidos de la API y actualiza el estado mediante el servicio', async () => {
        mocks.listarPedidosAdminDesdeAPI.mockResolvedValue([pedidoPrueba]);

        mostrarPagina();

        expect(await screen.findByText('PED-DB-1')).toBeInTheDocument();

        await userEvent.selectOptions(
            screen.getByLabelText('Estado del pedido PED-DB-1'),
            'entregado',
        );

        await waitFor(() => {
            expect(mocks.actualizarEstadoPedidoEnAPI).toHaveBeenCalledWith(
                'PED-DB-1',
                'entregado',
                'token-admin-ficticio',
            );
        });

        expect(await screen.findByText(
            'El pedido PED-DB-1 ahora está "Entregado".',
        )).toBeInTheDocument();
    });
});
