import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ post: vi.fn(), get: vi.fn() }));

// Se reemplaza solo la instancia de Axios; obtenerMensajeError y pedir son los reales.
vi.mock('./api.js', async (original) => ({
    ...(await original()),
    api: { post: mocks.post, get: mocks.get },
}));

import {
    alCambiarSesion,
    verificarSesion,
    cerrarSesion,
    iniciarSesion,
    obtenerSesion,
    obtenerToken,
    registrarUsuario,
} from './authService';

const usuario = { id: '2', nombre: 'Ana', email: 'ana@correo.cl', rol: 'cliente' };

describe('authService con Axios', () => {
    beforeEach(() => {
        cerrarSesion();
        mocks.post.mockReset();
        mocks.get.mockReset();
    });

    it('registra un cliente enviando el DTO normalizado', async () => {
        mocks.post.mockResolvedValue({ data: { usuario } });

        const resultado = await registrarUsuario({
            nombre: ' Ana ',
            email: ' Ana@Correo.cl ',
            clave: 'ClaveDePrueba123',
        });

        expect(resultado).toEqual(usuario);
        expect(mocks.post).toHaveBeenCalledWith('/auth/register', {
            nombre: 'Ana',
            email: 'ana@correo.cl',
            password: 'ClaveDePrueba123',
        });
    });

    it('rechaza el registro si faltan datos, sin llamar a la API', async () => {
        await expect(registrarUsuario({ nombre: '', email: '', clave: '' }))
            .rejects.toThrow('Nombre, correo y contraseña son obligatorios');
        expect(mocks.post).not.toHaveBeenCalled();
    });

    it('inicia sesión y guarda token y usuario en sessionStorage', async () => {
        mocks.post.mockResolvedValue({ data: { accessToken: 'token-ficticio', usuario } });

        const resultado = await iniciarSesion(' Ana@Correo.cl ', 'ClaveDePrueba123');

        expect(resultado).toEqual(usuario);
        expect(obtenerSesion()).toEqual(usuario);
        expect(obtenerToken()).toBe('token-ficticio');
        expect(mocks.post).toHaveBeenCalledWith('/auth/login', {
            email: 'ana@correo.cl',
            password: 'ClaveDePrueba123',
        });
        expect(JSON.parse(sessionStorage.getItem('sesion')).token).toBe('token-ficticio');
    });

    it('devuelve el mensaje de la API si falla el login', async () => {
        mocks.post.mockRejectedValue({
            response: { status: 401, data: { error: 'Correo o contraseña incorrectos' } },
        });

        await expect(iniciarSesion('ana@correo.cl', 'incorrecta'))
            .rejects.toThrow('Correo o contraseña incorrectos');

        expect(obtenerSesion()).toBeNull();
        expect(obtenerToken()).toBeNull();
    });

    it('limpia la sesión al cerrar sesión', async () => {
        mocks.post.mockResolvedValue({ data: { accessToken: 'token-ficticio', usuario } });

        await iniciarSesion('ana@correo.cl', 'ClaveDePrueba123');
        cerrarSesion();

        expect(obtenerSesion()).toBeNull();
        expect(obtenerToken()).toBeNull();
        expect(sessionStorage.getItem('sesion')).toBeNull();
    });

    it('cierra la sesión sola cuando el token ya expiró', async () => {
        const carga = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 10 }));
        mocks.post.mockResolvedValue({ data: { accessToken: `a.${carga}.c`, usuario } });

        await iniciarSesion('ana@correo.cl', 'ClaveDePrueba123');

        expect(obtenerToken()).toBeNull();
        expect(obtenerSesion()).toBeNull();
    });

    describe('verificarSesion (al recargar la página)', () => {
        async function entrarComoCliente() {
            mocks.post.mockResolvedValue({ data: { accessToken: 'token-ficticio', usuario } });
            await iniciarSesion('ana@correo.cl', 'ClaveDePrueba123');
        }

        it('si un administrador cambió el rol, actualiza los datos guardados', async () => {
            await entrarComoCliente();
            mocks.get.mockResolvedValue({ data: { usuario: { ...usuario, rol: 'vendedor' } } });

            const actual = await verificarSesion();

            expect(mocks.get).toHaveBeenCalledWith('/usuarios/2', expect.any(Object));
            expect(actual.rol).toBe('vendedor');
            expect(obtenerSesion().rol).toBe('vendedor');
            expect(JSON.parse(sessionStorage.getItem('sesion')).usuario.rol).toBe('vendedor');
        });

        it('si la cuenta fue desactivada (401), cierra la sesión y avisa a la interfaz', async () => {
            await entrarComoCliente();
            const aviso = vi.fn();
            const desuscribir = alCambiarSesion(aviso);
            mocks.get.mockRejectedValue({ response: { status: 401, data: { error: 'Token inválido o vencido' } } });

            await verificarSesion();

            expect(obtenerToken()).toBeNull();
            expect(obtenerSesion()).toBeNull();
            expect(aviso).toHaveBeenCalledWith(null);
            desuscribir();
        });

        it('si no hay conexión, conserva la sesión', async () => {
            await entrarComoCliente();
            mocks.get.mockRejectedValue({ request: {} });

            await verificarSesion();

            expect(obtenerSesion()).toEqual(usuario);
        });

        it('sin sesión no llama a la API', async () => {
            expect(await verificarSesion()).toBeNull();
            expect(mocks.get).not.toHaveBeenCalled();
        });
    });
});
