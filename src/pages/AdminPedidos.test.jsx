import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProductosProvider } from '../context/ProductosContext';
import { CarritoProvider } from '../context/CarritoContext';
import { PedidosProvider } from '../context/PedidosContext';
import PaginaAdminPedidos from './AdminPedidos';
import { crearPedido, obtenerPedido } from '../services/pedidoService';
import { obtenerProducto } from '../services/productoService';

function mostrarPagina() {
    return render(
        <MemoryRouter initialEntries={['/admin/pedidos']}>
            <AuthProvider>
                <ProductosProvider>
                    <CarritoProvider>
                        <PedidosProvider>
                            <PaginaAdminPedidos />
                        </PedidosProvider>
                    </CarritoProvider>
                </ProductosProvider>
            </AuthProvider>
        </MemoryRouter>
    );
}

describe('PaginaAdminPedidos', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('sesion', JSON.stringify({ nombre: 'Admin', email: 'admin@audiomax.cl', rol: 'admin' }));
    });

    it('muestra un mensaje cuando todavía no hay pedidos', () => {
        mostrarPagina();

        expect(screen.getByText('Aún no hay pedidos.')).toBeInTheDocument();
    });

    it('lista los pedidos y deja cambiar su estado', async () => {
        crearPedido({
            items: [{ producto: obtenerProducto('GTR-001'), cantidad: 1 }],
            cliente: { nombre: 'Ana Pérez', direccion: 'Calle 1', tarjetaFinal: '4242' },
            usuario: 'ana@correo.cl',
        });
        mostrarPagina();
        expect(screen.getByText('PED-0001')).toBeInTheDocument();

        await userEvent.selectOptions(screen.getByLabelText('Estado del pedido PED-0001'), 'entregado');

        expect(obtenerPedido('PED-0001').estado).toBe('entregado');
        expect(screen.getByText('El pedido PED-0001 ahora está "Entregado".')).toBeInTheDocument();
    });
});