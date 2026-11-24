import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
    cerrarSesion,
    iniciarSesion,
    obtenerSesion,
    obtenerToken,
    registrarUsuario,
} from './authService';

function respuesta(body, status = 200) {
    return {
        ok: status >= 200 && status < 300,
        status,
        json: async () => body,
    };
}

describe('authService con API', () => {
    beforeEach(() => {
        cerrarSesion();
        vi.stubGlobal('fetch', vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        cerrarSesion();
    });

    it('registra un cliente mediante la API y normaliza el correo', async () => {
        const usuario = {
            id: '1',
            nombre: 'Ana',
            email: 'ana@correo.cl',
            rol: 'cliente',
        };

        fetch.mockResolvedValue(respuesta({ usuario }, 201));

        const resultado = await registrarUsuario({
            nombre: ' Ana ',
            email: ' Ana@Correo.cl ',
            clave: 'ClaveDePrueba123',
        });

        expect(resultado).toEqual(usuario);
        expect(fetch).toHaveBeenCalledWith('/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: 'Ana',
                email: 'ana@correo.cl',
                password: 'ClaveDePrueba123',
            }),
        });
    });

    it('inicia sesión y mantiene el token solo en memoria', async () => {
        const usuario = {
            id: '2',
            nombre: 'Ana',
            email: 'ana@correo.cl',
            rol: 'cliente',
        };

        fetch.mockResolvedValue(respuesta({
            accessToken: 'token-ficticio',
            usuario,
        }));

        const resultado = await iniciarSesion(' Ana@Correo.cl ', 'ClaveDePrueba123');

        expect(resultado).toEqual(usuario);
        expect(obtenerSesion()).toEqual(usuario);
        expect(obtenerToken()).toBe('token-ficticio');
        expect(fetch).toHaveBeenCalledWith('/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'ana@correo.cl',
                password: 'ClaveDePrueba123',
            }),
        });
    });

    it('devuelve el error de la API si falla el login', async () => {
        fetch.mockResolvedValue(respuesta({
            error: 'Correo o contraseña incorrectos',
        }, 401));

        await expect(iniciarSesion('ana@correo.cl', 'incorrecta'))
            .rejects.toThrow('Correo o contraseña incorrectos');

        expect(obtenerSesion()).toBeNull();
        expect(obtenerToken()).toBeNull();
    });

    it('limpia usuario y token al cerrar sesión', async () => {
        fetch.mockResolvedValue(respuesta({
            accessToken: 'token-ficticio',
            usuario: {
                id: '2',
                nombre: 'Ana',
                email: 'ana@correo.cl',
                rol: 'cliente',
            },
        }));

        await iniciarSesion('ana@correo.cl', 'ClaveDePrueba123');
        cerrarSesion();

        expect(obtenerSesion()).toBeNull();
        expect(obtenerToken()).toBeNull();
    });
});
