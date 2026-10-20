import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('parte sin sesión', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        expect(result.current.usuario).toBeNull();
        expect(result.current.esAdmin).toBe(false);
    });

    it('el administrador inicia sesión y esAdmin es verdadero', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        let respuesta;
        act(() => { respuesta = result.current.iniciar('admin@audiomax.cl', 'admin123'); });

        expect(respuesta.ok).toBe(true);
        expect(result.current.esAdmin).toBe(true);
        expect(result.current.estaLogueado).toBe(true);
    });

    it('un cliente inicia sesión pero no es administrador', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        act(() => { result.current.iniciar('cliente@audiomax.cl', 'cliente123'); });

        expect(result.current.estaLogueado).toBe(true);
        expect(result.current.esAdmin).toBe(false);
    });

    it('devuelve el mensaje de error cuando las credenciales son incorrectas', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        let respuesta;
        act(() => { respuesta = result.current.iniciar('admin@audiomax.cl', 'mala'); });

        expect(respuesta).toEqual({ ok: false, error: 'Correo o contraseña incorrectos' });
        expect(result.current.usuario).toBeNull();
    });

    it('mantiene la sesión al recargar y la quita al cerrar sesión', () => {
        const primera = renderHook(() => useAuth(), { wrapper });
        act(() => { primera.result.current.iniciar('admin@audiomax.cl', 'admin123'); });
        primera.unmount();

        // "recargar la página": un provider nuevo lee la sesión guardada
        const segunda = renderHook(() => useAuth(), { wrapper });
        expect(segunda.result.current.esAdmin).toBe(true);

        act(() => segunda.result.current.cerrar());
        expect(segunda.result.current.usuario).toBeNull();
    });

    it('registrar crea la cuenta pero no inicia sesión', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        let respuesta;
        act(() => { respuesta = result.current.registrar({ nombre: 'Ana', email: 'ana@correo.cl', clave: '123456' }); });

        expect(respuesta.ok).toBe(true);
        expect(result.current.usuario).toBeNull();
    });
});
