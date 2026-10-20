import { describe, it, expect, beforeEach } from 'vitest';
import { obtenerProducto } from './productoService';
import { crearPedido, listarPedidos, obtenerPedido, actualizarEstadoPedido } from './pedidoService';

// Pruebas de integración: pedidoService + productoService + localStorage real.
// GTR-001 (Guitarra, $450.000) parte con stock 5; BAT-001 está agotada.
describe('pedidoService', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const cliente = { nombre: 'Ana Pérez', direccion: 'Av. Siempre Viva 123', tarjetaFinal: '4242' };
    const guitarra = () => obtenerProducto('GTR-001');
    const carritoCon = (producto, cantidad) => [{ producto, cantidad }];

    it('crea el pedido con id, total, estado inicial y lo deja guardado', () => {
        const pedido = crearPedido({ items: carritoCon(guitarra(), 2), cliente, usuario: 'ana@correo.cl' });

        expect(pedido.id).toBe('PED-0001');
        expect(pedido.total).toBe(900000);
        expect(pedido.estado).toBe('preparacion');
        expect(pedido.usuario).toBe('ana@correo.cl');
        expect(obtenerPedido('PED-0001')).toEqual(pedido);
    });

    it('baja el stock de los productos comprados', () => {
        crearPedido({ items: carritoCon(guitarra(), 2), cliente });

        expect(obtenerProducto('GTR-001').stock).toBe(3);
    });

    it('numera los pedidos en orden: PED-0001, PED-0002', () => {
        crearPedido({ items: carritoCon(guitarra(), 1), cliente });
        const segundo = crearPedido({ items: carritoCon(guitarra(), 1), cliente });

        expect(segundo.id).toBe('PED-0002');
        expect(listarPedidos()).toHaveLength(2);
    });

    it('rechaza un carrito vacío', () => {
        expect(() => crearPedido({ items: [], cliente })).toThrow('El carrito está vacío');
    });

    it('rechaza la compra si no alcanza el stock y no cambia nada', () => {
        expect(() => crearPedido({ items: carritoCon(guitarra(), 6), cliente })).toThrow('solo quedan 5 unidades');

        expect(obtenerProducto('GTR-001').stock).toBe(5); // el stock quedó igual
        expect(listarPedidos()).toEqual([]);              // y no se creó ningún pedido
    });

    it('no vende nada si UNO de los productos del carrito no tiene stock (todo o nada)', () => {
        const items = [
            { producto: guitarra(), cantidad: 1 },
            { producto: obtenerProducto('BAT-001'), cantidad: 1 }, // agotada
        ];

        expect(() => crearPedido({ items, cliente })).toThrow('está agotado');

        expect(obtenerProducto('GTR-001').stock).toBe(5);
    });

    it('cobra el precio actual aunque el carrito tenga una copia con precio viejo', () => {
        const copiaVieja = { ...guitarra(), precio: 1000 };

        const pedido = crearPedido({ items: carritoCon(copiaVieja, 1), cliente });

        expect(pedido.total).toBe(450000);
    });

    it('cambia el estado de un pedido', () => {
        crearPedido({ items: carritoCon(guitarra(), 1), cliente });

        const actualizado = actualizarEstadoPedido('PED-0001', 'despachado');

        expect(actualizado.estado).toBe('despachado');
        expect(obtenerPedido('PED-0001').estado).toBe('despachado');
    });

    it('rechaza un estado inexistente y devuelve null si el pedido no existe', () => {
        crearPedido({ items: carritoCon(guitarra(), 1), cliente });

        expect(() => actualizarEstadoPedido('PED-0001', 'volando')).toThrow('Estado no válido');
        expect(actualizarEstadoPedido('PED-9999', 'entregado')).toBeNull();
    });
});
