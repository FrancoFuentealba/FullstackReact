import { describe, it, expect, beforeEach } from 'vitest';
import { registrarUsuario, iniciarSesion, cerrarSesion, obtenerSesion } from './authService';

describe('authService (usuarios y sesión)', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('registra un cliente nuevo sin devolver su clave', () => {
        const usuario = registrarUsuario({ nombre: 'Ana', email: ' Ana@Correo.cl ', clave: '123456' });

        expect(usuario).toEqual({ nombre: 'Ana', email: 'ana@correo.cl', rol: 'cliente' });
    });

    it('rechaza registrar un correo que ya existe, sin distinguir mayúsculas', () => {
        registrarUsuario({ nombre: 'Ana', email: 'ana@correo.cl', clave: '123456' });

        expect(() => registrarUsuario({ nombre: 'Otra', email: 'ANA@correo.cl', clave: '654321' }))
            .toThrow('Ya existe una cuenta');
    });

    it('rechaza un registro con datos obligatorios vacíos', () => {
        expect(() => registrarUsuario({ nombre: '', email: 'a@b.cl', clave: '123456' }))
            .toThrow('son obligatorios');
    });

    it('inicia sesión con el administrador de ejemplo y guarda la sesión', () => {
        const usuario = iniciarSesion('admin@audiomax.cl', 'admin123');

        expect(usuario.rol).toBe('admin');
        expect(usuario.clave).toBeUndefined(); // la clave nunca sale del servicio
        expect(obtenerSesion()).toEqual(usuario);
    });

    it('un cliente recién registrado puede iniciar sesión', () => {
        registrarUsuario({ nombre: 'Ana', email: 'ana@correo.cl', clave: '123456' });

        expect(iniciarSesion('ana@correo.cl', '123456').rol).toBe('cliente');
    });

    it('rechaza una clave incorrecta con el mismo mensaje que un correo inexistente', () => {
        expect(() => iniciarSesion('admin@audiomax.cl', 'mala')).toThrow('Correo o contraseña incorrectos');
        expect(() => iniciarSesion('nadie@correo.cl', 'admin123')).toThrow('Correo o contraseña incorrectos');
        expect(obtenerSesion()).toBeNull();
    });

    it('cierra la sesión', () => {
        iniciarSesion('admin@audiomax.cl', 'admin123');

        cerrarSesion();

        expect(obtenerSesion()).toBeNull();
    });

    it('ignora una sesión guardada con texto dañado', () => {
        localStorage.setItem('sesion', '{no es json');

        expect(obtenerSesion()).toBeNull();
    });
});
