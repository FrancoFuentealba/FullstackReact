import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTituloPagina } from './useTituloPagina';

describe('useTituloPagina', () => {
    it('cambia el título de la pestaña agregando el nombre de la tienda', () => {
        renderHook(() => useTituloPagina('Catálogo'));

        expect(document.title).toBe('Catálogo | AudioMax');
    });

    it('restaura el título anterior al salir de la página', () => {
        document.title = 'Título original';
        const { unmount } = renderHook(() => useTituloPagina('Carrito'));

        unmount();

        expect(document.title).toBe('Título original');
    });
});