import { describe, it, expect } from 'vitest';
import { revisarItems, calcularTotalPedido, filtrarPorUsuario } from './pedidos';

// Catálogo ACTUAL (lo que hay hoy en la tienda).
const catalogo = [
    { codigo: 'GTR-001', nombre: 'Guitarra', precio: 450000, stock: 3 },
    { codigo: 'PED-001', nombre: 'Pedal', precio: 50000, stock: 1 },
    { codigo: 'BAT-001', nombre: 'Batería', precio: 439000, stock: 0 },
];

// El carrito guarda una copia del producto de cuando se agregó (puede estar desactualizada).
const enCarrito = (producto, cantidad) => ({ producto, cantidad });

describe('revisarItems', () => {
    it('deja pasar los productos con stock suficiente y calcula el subtotal', () => {
        const { lineas, problemas } = revisarItems([enCarrito(catalogo[0], 2)], catalogo);

        expect(problemas).toEqual([]);
        expect(lineas).toEqual([
            { codigo: 'GTR-001', nombre: 'Guitarra', precio: 450000, cantidad: 2, subtotal: 900000 },
        ]);
    });

    it('usa el precio ACTUAL del catálogo, no el de la copia guardada en el carrito', () => {
        const copiaVieja = { codigo: 'GTR-001', nombre: 'Guitarra', precio: 100, stock: 3 };

        const { lineas } = revisarItems([enCarrito(copiaVieja, 1)], catalogo);

        expect(lineas[0].precio).toBe(450000);
    });

    it('informa cuántas unidades quedan cuando no alcanza el stock', () => {
        const { lineas, problemas } = revisarItems([enCarrito(catalogo[0], 5)], catalogo);

        expect(lineas).toEqual([]);
        expect(problemas).toEqual(['Guitarra: solo quedan 3 unidades']);
    });

    it('usa el singular cuando queda una sola unidad', () => {
        const { problemas } = revisarItems([enCarrito(catalogo[1], 2)], catalogo);

        expect(problemas).toEqual(['Pedal: solo queda 1 unidad']);
    });

    it('informa un producto agotado', () => {
        const { problemas } = revisarItems([enCarrito(catalogo[2], 1)], catalogo);

        expect(problemas).toEqual(['Batería está agotado']);
    });

    it('informa un producto que el administrador eliminó del catálogo', () => {
        const eliminado = { codigo: 'XXX-999', nombre: 'Teclado', precio: 1, stock: 1 };

        const { problemas } = revisarItems([enCarrito(eliminado, 1)], catalogo);

        expect(problemas).toEqual(['Teclado ya no está disponible']);
    });
});

describe('calcularTotalPedido', () => {
    it('suma los subtotales de las líneas', () => {
        expect(calcularTotalPedido([{ subtotal: 900000 }, { subtotal: 50000 }])).toBe(950000);
    });

    it('devuelve 0 sin líneas', () => {
        expect(calcularTotalPedido([])).toBe(0);
    });
});

describe('filtrarPorUsuario', () => {
    const pedidos = [
        { id: 'PED-0001', usuario: 'ana@correo.cl' },
        { id: 'PED-0002', usuario: 'luis@correo.cl' },
        { id: 'PED-0003', usuario: null },
    ];

    it('deja solo los pedidos de ese correo, sin distinguir mayúsculas', () => {
        expect(filtrarPorUsuario(pedidos, 'ANA@correo.cl')).toEqual([{ id: 'PED-0001', usuario: 'ana@correo.cl' }]);
    });

    it('devuelve una lista vacía si no hay sesión (correo vacío o null)', () => {
        expect(filtrarPorUsuario(pedidos, null)).toEqual([]);
        expect(filtrarPorUsuario(pedidos, '')).toEqual([]);
    });
});
