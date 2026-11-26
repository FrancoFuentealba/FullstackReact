import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // La sesión vive en sessionStorage (ver services/sesion.js) y sobrevive a recargar la página.
    const [usuario, setUsuario] = useState(() => authService.obtenerSesion());

    useEffect(() => {
        // Si la sesión se cierra o cambia por su cuenta (token vencido, 401, rol modificado), la pantalla se entera.
        const desuscribir = authService.alCambiarSesion((actual) => setUsuario(actual));

        // Al abrir o recargar, se confirma con el servidor que la cuenta sigue activa y con el mismo rol.
        authService.verificarSesion();

        return desuscribir;
    }, []);

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
        esVendedor: usuario?.rol === 'vendedor',
        // admin y vendedor entran al panel interno; cada uno ve solo lo que su rol permite
        esPersonal: usuario?.rol === 'admin' || usuario?.rol === 'vendedor',
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
