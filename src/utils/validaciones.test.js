import { describe, it, expect } from 'vitest';
import {
    validarObligatorio,
    validarEmail,
    validarClave,
    validarNumero,
    validarTarjeta,
    validarConfirmacion,
    validarDatosProducto,
    sinErrores,
} from './validaciones';

// Regla de todas las validaciones: devuelven '' cuando el dato es válido
// y un mensaje de error cuando no lo es.

describe('validarObligatorio', () => {
    it('rechaza un texto vacío o solo con espacios', () => {
        expect(validarObligatorio('')).toBe('Este campo es obligatorio');
        expect(validarObligatorio('   ')).toBe('Este campo es obligatorio');
    });

    it('usa el mensaje personalizado cuando se entrega uno', () => {
        expect(validarObligatorio('', 'El nombre es obligatorio')).toBe('El nombre es obligatorio');
    });

    it('acepta un texto con contenido', () => {
        expect(validarObligatorio('Fender')).toBe('');
    });
});

describe('validarEmail', () => {
    it('exige que el correo no esté vacío', () => {
        expect(validarEmail('')).toBe('El correo es obligatorio');
    });

    it('rechaza correos sin @ o sin punto en el dominio', () => {
        expect(validarEmail('ana.correo.cl')).toBe('Ingresa un correo válido');
        expect(validarEmail('ana@correo')).toBe('Ingresa un correo válido');
    });

    it('acepta un correo con formato válido', () => {
        expect(validarEmail('ana@correo.cl')).toBe('');
    });
});

describe('validarClave', () => {
    it('rechaza claves de menos de 6 caracteres', () => {
        expect(validarClave('12345')).toBe('La clave debe tener al menos 6 caracteres');
    });

    it('acepta una clave de 6 caracteres', () => {
        expect(validarClave('123456')).toBe('');
    });
});

describe('validarNumero', () => {
    it('rechaza vacío, decimales y valores bajo el mínimo', () => {
        expect(validarNumero('', 1, 'El precio')).toBe('El precio es obligatorio');
        expect(validarNumero('3.5', 1, 'El precio')).toBe('El precio debe ser un número entero');
        expect(validarNumero('0', 1, 'El precio')).toBe('El precio debe ser al menos 1');
    });

    it('acepta un entero igual o mayor al mínimo', () => {
        expect(validarNumero('450000', 1, 'El precio')).toBe('');
        expect(validarNumero('0', 0, 'El stock')).toBe('');
    });
});

describe('validarTarjeta', () => {
    it('acepta 16 dígitos, con o sin espacios', () => {
        expect(validarTarjeta('1234567812345678')).toBe('');
        expect(validarTarjeta('1234 5678 1234 5678')).toBe('');
    });

    it('rechaza una tarjeta con menos de 16 dígitos', () => {
        expect(validarTarjeta('1234 5678')).toBe('La tarjeta debe tener 16 dígitos');
    });
});

describe('validarConfirmacion', () => {
    it('rechaza cuando las claves no coinciden', () => {
        expect(validarConfirmacion('123456', '654321')).toBe('Las claves no coinciden');
    });

    it('acepta cuando las claves son iguales', () => {
        expect(validarConfirmacion('123456', '123456')).toBe('');
    });
});

describe('validarDatosProducto y sinErrores', () => {
    // Los formularios entregan todo como texto, por eso precio y stock van entre comillas.
    const productoValido = {
        codigo: 'GTR-009',
        nombre: 'Guitarra Eléctrica',
        marca: 'Fender',
        modelo: 'Player',
        categoria: 'Guitarras',
        precio: '450000',
        stock: '3',
    };

    it('no entrega errores cuando el producto está completo', () => {
        expect(sinErrores(validarDatosProducto(productoValido))).toBe(true);
    });

    it('entrega un error por cada campo obligatorio vacío', () => {
        const errores = validarDatosProducto({});

        expect(errores.codigo).toBe('El código es obligatorio');
        expect(errores.nombre).toBe('El nombre es obligatorio');
        expect(errores.categoria).toBe('Selecciona una categoría');
        expect(sinErrores(errores)).toBe(false);
    });

    it('no exige el código al editar un producto existente', () => {
        const errores = validarDatosProducto({ ...productoValido, codigo: '' }, false);

        expect(errores.codigo).toBe('');
    });

    
});

