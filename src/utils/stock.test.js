import { describe, it, expect } from 'vitest';
import { hayStock } from './stock';

describe('hayStock', () => {
    it('es verdadero cuando el producto tiene unidades', () => {
        expect(hayStock({ stock: 5 })).toBe(true);
    });

    it('es falso cuando el stock es 0', () => {
        expect(hayStock({ stock: 0 })).toBe(false);
    });

    it('es falso cuando el stock es negativo', () => {
        expect(hayStock({ stock: -1 })).toBe(false);
    });
});
