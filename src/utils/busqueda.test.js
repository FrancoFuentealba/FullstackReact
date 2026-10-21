import { describe, it, expect } from 'vitest';
import { filtrarProductos } from './busqueda';

const productos = [
    { codigo: 'GTR-001', categoria: 'Guitarras', nombre: 'Guitarra Eléctrica Stratocaster', marca: 'Fender', modelo: 'Player Strat' },
    { codigo: 'MIC-001', categoria: 'Audio', nombre: 'Micrófono Wharfedale DM 5.0', marca: 'Wharfedale', modelo: 'DM 5.0 PRO' },
];

describe('filtrarProductos', () => {
    it('busca por nombre sin importar las mayúsculas', () => {
        expect(filtrarProductos(productos, 'GUITARRA')).toHaveLength(1);
    });

    it('ignora las tildes', () => {
        expect(filtrarProductos(productos, 'microfono')[0].codigo).toBe('MIC-001');
    });

    it('busca por marca', () => {
        expect(filtrarProductos(productos, 'fender')[0].codigo).toBe('GTR-001');
    });

    it('exige que estén todas las palabras', () => {
        expect(filtrarProductos(productos, 'guitarra wharfedale')).toHaveLength(0);
    });

    it('devuelve una lista vacía si no hay texto', () => {
        expect(filtrarProductos(productos, '   ')).toEqual([]);
    });
});