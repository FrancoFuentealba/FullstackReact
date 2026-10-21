import { describe, it, expect } from 'vitest';
import {
    agregarItem,
    restarItem,
    quitarItem,
    calcularTotal,
    calcularCantidadTotal,
    limpiarCarrito,
} from './carrito';

// Productos de ejemplo: solo tienen los campos que usa la lógica del carrito.
const guitarra = { codigo: 'GTR-001', nombre: 'Guitarra', precio: 450000, stock: 2 };
const pedal = { codigo: 'PED-001', nombre: 'Pedal', precio: 50000, stock: 10 };
const agotado = { codigo: 'BAT-001', nombre: 'Batería', precio: 439000, stock: 0 };

describe('agregarItem', () => {
    it('agrega un producto nuevo con cantidad 1', () => {
        const carrito = agregarItem([], guitarra);

        expect(carrito).toEqual([{ producto: guitarra, cantidad: 1 }]);
    });

    it('suma 1 cuando el producto ya estaba en el carrito', () => {
        const carrito = agregarItem([{ producto: pedal, cantidad: 1 }], pedal);

        expect(carrito[0].cantidad).toBe(2);
    });

    it('no agrega un producto sin stock', () => {
        expect(agregarItem([], agotado)).toEqual([]);
    });

    it('no pasa del stock disponible', () => {
        // la guitarra tiene stock 2: el tercer intento no debe sumar
        let carrito = [];
        carrito = agregarItem(carrito, guitarra);
        carrito = agregarItem(carrito, guitarra);
        carrito = agregarItem(carrito, guitarra);

        expect(carrito[0].cantidad).toBe(2);
    });

    it('no modifica el carrito original (devuelve uno nuevo)', () => {
        const original = [{ producto: pedal, cantidad: 1 }];

        agregarItem(original, pedal);

        expect(original[0].cantidad).toBe(1);
    });
});

describe('restarItem', () => {
    it('baja la cantidad en 1', () => {
        const carrito = restarItem([{ producto: pedal, cantidad: 3 }], 'PED-001');

        expect(carrito[0].cantidad).toBe(2);
    });

    it('saca el producto del carrito cuando la cantidad llega a 0', () => {
        const carrito = restarItem([{ producto: pedal, cantidad: 1 }], 'PED-001');

        expect(carrito).toEqual([]);
    });
});

describe('quitarItem', () => {
    it('elimina el producto sin importar su cantidad y deja los demás', () => {
        const carrito = [
            { producto: pedal, cantidad: 4 },
            { producto: guitarra, cantidad: 1 },
        ];

        expect(quitarItem(carrito, 'PED-001')).toEqual([{ producto: guitarra, cantidad: 1 }]);
    });
});

describe('calcularTotal y calcularCantidadTotal', () => {
    const carrito = [
        { producto: guitarra, cantidad: 2 }, // 900.000
        { producto: pedal, cantidad: 3 },    // 150.000
    ];

    it('suma precio por cantidad de cada producto', () => {
        expect(calcularTotal(carrito)).toBe(1050000);
    });

    it('devuelve 0 si el carrito está vacío', () => {
        expect(calcularTotal([])).toBe(0);
    });

    it('cuenta las unidades de todos los productos', () => {
        expect(calcularCantidadTotal(carrito)).toBe(5);
    });
    it('cobra el precio con descuento', () => {
        const items = [{ producto: { codigo: 'A', precio: 100000, descuento: 10, stock: 5 }, cantidad: 2 }];
        expect(calcularTotal(items)).toBe(180000);
    });
});

describe('limpiarCarrito', () => {
    it('devuelve una lista vacía si lo guardado no es una lista', () => {
        expect(limpiarCarrito({ a: 1 })).toEqual([]);
        expect(limpiarCarrito(null)).toEqual([]);
    });

    it('descarta los items con forma incorrecta y deja los válidos', () => {
        const guardado = [
            { x: 1 },                                    // sin producto
            null,
            { producto: { codigo: 'A' }, cantidad: '2' }, // cantidad como texto
            { producto: { codigo: 'B' }, cantidad: 0 },   // cantidad 0
            { producto: pedal, cantidad: 2 },             // válido
        ];

        expect(limpiarCarrito(guardado)).toEqual([{ producto: pedal, cantidad: 2 }]);
    });
});
