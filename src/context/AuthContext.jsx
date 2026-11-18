import { createContext, useContext, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // El token se mantiene solo en memoria; al recargar habrá que iniciar sesión otra vez.
    const [usuario, setUsuario] = useState(() => authService.obtenerSesion());

    async function iniciar(email, clave) {
        try {
            const sesion = await authService.iniciarSesion(email, clave);
            setUsuario(sesion);
            return { ok: true, usuario: sesion };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    async function registrar(datos) {
        try {
            const nuevoUsuario = await authService.registrarUsuario(datos);
            return { ok: true, usuario: nuevoUsuario };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    function cerrar() {
        authService.cerrarSesion();
        setUsuario(null);
    }

    const valor = {
        usuario,
        estaLogueado: usuario !== null,
        esAdmin: usuario?.rol === 'admin',
        iniciar,
        registrar,
        cerrar,
    };

    return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const contexto = useContext(AuthContext);

    if (!contexto) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }

    return contexto;
}
