import { describe, it, expect, beforeEach } from 'vitest';
import { productosData } from '../data/productos.js';
import {
    listarProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} from './productoService';

// Estas pruebas usan el localStorage real (el que simula jsdom),
// por eso son pruebas de integración entre el servicio y el almacenamiento.
describe('productoService (CRUD con persistencia)', () => {
    beforeEach(() => {
        localStorage.clear(); // cada prueba parte desde cero
    });

    const productoNuevo = {
        codigo: 'GTR-100',
        categoria: 'Guitarras',
        nombre: 'Guitarra de prueba',
        marca: 'Fender',
        modelo: 'Test',
        stock: '4',      // los formularios entregan texto
        precio: '100000',
        imagen: '/img/prueba.jpg',
    };

    it('lista los productos iniciales cuando no hay nada guardado', () => {
        expect(listarProductos()).toHaveLength(productosData.length);
    });

    it('vuelve a los datos iniciales si lo guardado está dañado', () => {
        localStorage.setItem('productos', '{no es json');

        expect(listarProductos()).toHaveLength(productosData.length);
    });

    it('crea un producto, convierte precio y stock a número y lo deja guardado', () => {
        const creado = crearProducto(productoNuevo);

        expect(creado.precio).toBe(100000);
        expect(creado.stock).toBe(4);
        expect(obtenerProducto('GTR-100')).toEqual(creado);
        expect(listarProductos()).toHaveLength(productosData.length + 1);
    });

    it('rechaza un código repetido, sin distinguir mayúsculas', () => {
        expect(() => crearProducto({ ...productoNuevo, codigo: 'gtr-001' })).toThrow('Ya existe un producto');
    });

    it('rechaza un producto sin código', () => {
        expect(() => crearProducto({ ...productoNuevo, codigo: '  ' })).toThrow('El código es obligatorio');
    });

    it('actualiza solo los campos indicados y no cambia el código', () => {
        const actualizado = actualizarProducto('GTR-001', { stock: '9', codigo: 'OTRO' });

        expect(actualizado.stock).toBe(9);
        expect(actualizado.codigo).toBe('GTR-001');
        expect(actualizado.nombre).toBe(productosData[0].nombre); 
    });

    it('devuelve null al actualizar un producto que no existe', () => {
        expect(actualizarProducto('NO-EXISTE', { stock: 1 })).toBeNull();
    });

    it('elimina un producto y avisa si el código no existia', () => {
        expect(eliminarProducto('GTR-001')).toBe(true);
        expect(obtenerProducto('GTR-001')).toBeNull();
        expect(eliminarProducto('GTR-001')).toBe(false);
    });
});
