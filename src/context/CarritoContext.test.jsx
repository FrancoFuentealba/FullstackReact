import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CarritoProvider, useCarrito } from './CarritoContext';

const pedal = { codigo: 'PED-001', nombre: 'Pedal', precio: 50000, stock: 10 };

const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;

describe('CarritoContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('agrega un producto y calcula el total y la cantidad', () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });

        act(() => result.current.agregar(pedal));
        act(() => result.current.agregar(pedal));

        expect(result.current.cantidadTotal).toBe(2);
        expect(result.current.total).toBe(100000);
    });

    it('guarda el carrito en localStorage cada vez que cambia', () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });

        act(() => result.current.agregar(pedal));

        const guardado = JSON.parse(localStorage.getItem('carrito'));
        expect(guardado).toEqual([{ producto: pedal, cantidad: 1 }]);
    });

    it('recupera el carrito guardado al abrir la aplicación', () => {
        localStorage.setItem('carrito', JSON.stringify([{ producto: pedal, cantidad: 3 }]));

        const { result } = renderHook(() => useCarrito(), { wrapper });

        expect(result.current.cantidadTotal).toBe(3);
    });

    it('parte con el carrito vacío si lo guardado está dañado', () => {
        localStorage.setItem('carrito', '{no es json');

        const { result } = renderHook(() => useCarrito(), { wrapper });

        expect(result.current.items).toEqual([]);
    });

    it('vacía el carrito completo (se usa al confirmar una compra)', () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });
        act(() => result.current.agregar(pedal));

        act(() => result.current.vaciar());

        expect(result.current.items).toEqual([]);
        expect(JSON.parse(localStorage.getItem('carrito'))).toEqual([]);
    });

    it('falla con un mensaje claro si se usa fuera del CarritoProvider', () => {
        vi.spyOn(console, 'error').mockImplementation(() => {}); // React avisa del error en consola; se silencia

        expect(() => renderHook(() => useCarrito())).toThrow('CarritoProvider');

        vi.restoreAllMocks();
    });
});