import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { ProductosProvider, useProductos } from './ProductosContext';
import { CarritoProvider, useCarrito } from './CarritoContext';
import { PedidosProvider, usePedidos } from './PedidosContext';


const wrapper = ({ children }) => (
    <AuthProvider>
        <ProductosProvider>
            <CarritoProvider>
                <PedidosProvider>{children}</PedidosProvider>
            </CarritoProvider>
        </ProductosProvider>
    </AuthProvider>
);

// Un solo hook que junta todo lo que la prueba necesita mirar.
function useTodo() {
    return { auth: useAuth(), productos: useProductos(), carrito: useCarrito(), pedidos: usePedidos() };
}

const cliente = { nombre: 'Ana Pérez', direccion: 'Av. Siempre Viva 123', tarjetaFinal: '4242' };
const stockDe = (resultado, codigo) => resultado.current.productos.productos.find((p) => p.codigo === codigo).stock;

describe('PedidosContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('confirmarCompra crea el pedido, baja el stock y vacía el carrito', () => {
        const { result } = renderHook(useTodo, { wrapper });
        const guitarra = result.current.productos.productos.find((p) => p.codigo === 'GTR-001');
        act(() => result.current.carrito.agregar(guitarra));
        act(() => result.current.carrito.agregar(guitarra));

        let respuesta;
        act(() => { respuesta = result.current.pedidos.confirmarCompra(cliente); });

        expect(respuesta.ok).toBe(true);
        expect(respuesta.pedido.total).toBe(765000);
        expect(stockDe(result, 'GTR-001')).toBe(3);          // el catálogo ya muestra el stock nuevo
        expect(result.current.carrito.items).toEqual([]);    // el carrito quedó vacío
        expect(result.current.pedidos.pedidos).toHaveLength(1);
    });

    it('si no alcanza el stock devuelve el error y NO vacía el carrito', () => {
        const { result } = renderHook(useTodo, { wrapper });
        const guitarra = result.current.productos.productos.find((p) => p.codigo === 'GTR-001');
        act(() => result.current.carrito.agregar(guitarra));
        act(() => result.current.productos.actualizar('GTR-001', { stock: 0 })); // alguien más compró todo

        let respuesta;
        act(() => { respuesta = result.current.pedidos.confirmarCompra(cliente); });

        expect(respuesta.ok).toBe(false);
        expect(respuesta.error).toContain('agotado');
        expect(result.current.carrito.items).toHaveLength(1);
        expect(result.current.pedidos.pedidos).toEqual([]);
    });

    it('misPedidos muestra solo los pedidos del cliente con sesión iniciada', () => {
        const { result } = renderHook(useTodo, { wrapper });
        const guitarra = result.current.productos.productos.find((p) => p.codigo === 'GTR-001');

        act(() => { result.current.auth.iniciar('cliente@audiomax.cl', 'cliente123'); });
        act(() => result.current.carrito.agregar(guitarra));
        act(() => { result.current.pedidos.confirmarCompra(cliente); });

        expect(result.current.pedidos.misPedidos).toHaveLength(1);
        expect(result.current.pedidos.misPedidos[0].usuario).toBe('cliente@audiomax.cl');

        act(() => result.current.auth.cerrar());
        expect(result.current.pedidos.misPedidos).toEqual([]); // sin sesión no se ve ninguno
    });

    it('cambiarEstado actualiza la etapa del pedido', () => {
        const { result } = renderHook(useTodo, { wrapper });
        const guitarra = result.current.productos.productos.find((p) => p.codigo === 'GTR-001');
        act(() => result.current.carrito.agregar(guitarra));
        act(() => { result.current.pedidos.confirmarCompra(cliente); });

        act(() => { result.current.pedidos.cambiarEstado('PED-0001', 'entregado'); });

        expect(result.current.pedidos.pedidos[0].estado).toBe('entregado');
    });
});