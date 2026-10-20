// AuthContext: el puente entre authService y las pantallas. Guarda quién inició sesión
// y entrega funciones para entrar, registrarse y salir. "esAdmin" sirve para proteger
// el panel de administración.
import { createContext, useContext, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // La sesión se lee de localStorage solo la primera vez: así sigue abierta al recargar.
    const [usuario, setUsuario] = useState(() => authService.obtenerSesion());

    // Devuelve { ok: true, usuario } o { ok: false, error } para mostrar el mensaje en el formulario.
    function iniciar(email, clave) {
        try {
            const sesion = authService.iniciarSesion(email, clave);
            setUsuario(sesion);
            return { ok: true, usuario: sesion };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    // Crea la cuenta (rol cliente) pero NO inicia sesión: la página puede llamar a iniciar() después.
    function registrar(datos) {
        try {
            return { ok: true, usuario: authService.registrarUsuario(datos) };
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

// Desde cualquier página: const { usuario, esAdmin, iniciar, cerrar } = useAuth()
export function useAuth() {
    const contexto = useContext(AuthContext);
    if (!contexto) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return contexto;
}
