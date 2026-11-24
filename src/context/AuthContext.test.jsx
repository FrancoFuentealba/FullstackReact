import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import * as authService from '../services/authService';

vi.mock('../services/authService', () => ({
    obtenerSesion: vi.fn(),
    iniciarSesion: vi.fn(),
    registrarUsuario: vi.fn(),
    cerrarSesion: vi.fn(),
}));

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext conectado a la API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        authService.obtenerSesion.mockReturnValue(null);
    });

    it('parte sin sesión', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        expect(result.current.usuario).toBeNull();
        expect(result.current.esAdmin).toBe(false);
    });

    it('inicia sesión como vendedor: es personal pero no administrador', async () => {
        const usuario = { id: '2', nombre: 'Vera', email: 'vendedor@audiomax.cl', rol: 'vendedor' };
        authService.iniciarSesion.mockResolvedValue(usuario);

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.iniciar('vendedor@audiomax.cl', 'ClavePrueba123');
        });

        expect(result.current.esVendedor).toBe(true);
        expect(result.current.esPersonal).toBe(true);
        expect(result.current.esAdmin).toBe(false);
    });

    it('inicia sesión como administrador', async () => {
        const usuario = {
            id: '1',
            nombre: 'Admin',
            email: 'admin@audiomax.cl',
            rol: 'admin',
        };
        authService.iniciarSesion.mockResolvedValue(usuario);

        const { result } = renderHook(() => useAuth(), { wrapper });
        let respuesta;

        await act(async () => {
            respuesta = await result.current.iniciar('admin@audiomax.cl', 'ClavePrueba123');
        });

        expect(respuesta).toEqual({ ok: true, usuario });
        expect(result.current.esAdmin).toBe(true);
        expect(result.current.estaLogueado).toBe(true);
    });

    it('inicia sesión como cliente, sin privilegios de administrador', async () => {
        const usuario = {
            id: '2',
            nombre: 'Ana',
            email: 'ana@correo.cl',
            rol: 'cliente',
        };
        authService.iniciarSesion.mockResolvedValue(usuario);

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.iniciar('ana@correo.cl', 'ClavePrueba123');
        });

        expect(result.current.estaLogueado).toBe(true);
        expect(result.current.esAdmin).toBe(false);
    });

    it('devuelve el error de la API si falla el inicio de sesión', async () => {
        authService.iniciarSesion.mockRejectedValue(
            new Error('Correo o contraseña incorrectos'),
        );

        const { result } = renderHook(() => useAuth(), { wrapper });
        let respuesta;

        await act(async () => {
            respuesta = await result.current.iniciar('ana@correo.cl', 'incorrecta');
        });

        expect(respuesta).toEqual({
            ok: false,
            error: 'Correo o contraseña incorrectos',
        });
        expect(result.current.usuario).toBeNull();
    });

    it('cerrar sesión limpia el usuario del contexto', async () => {
        const usuario = {
            id: '2',
            nombre: 'Ana',
            email: 'ana@correo.cl',
            rol: 'cliente',
        };
        authService.iniciarSesion.mockResolvedValue(usuario);

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.iniciar('ana@correo.cl', 'ClavePrueba123');
        });

        act(() => {
            result.current.cerrar();
        });

        expect(authService.cerrarSesion).toHaveBeenCalledOnce();
        expect(result.current.usuario).toBeNull();
        expect(result.current.estaLogueado).toBe(false);
    });

    it('registra la cuenta mediante el servicio, pero no inicia sesión por sí sola', async () => {
        const usuario = {
            id: '3',
            nombre: 'Ana',
            email: 'ana@correo.cl',
            rol: 'cliente',
        };
        authService.registrarUsuario.mockResolvedValue(usuario);

        const { result } = renderHook(() => useAuth(), { wrapper });
        let respuesta;

        await act(async () => {
            respuesta = await result.current.registrar({
                nombre: 'Ana',
                email: 'ana@correo.cl',
                clave: 'ClavePrueba123',
            });
        });

        expect(respuesta).toEqual({ ok: true, usuario });
        expect(result.current.usuario).toBeNull();
    });
});
