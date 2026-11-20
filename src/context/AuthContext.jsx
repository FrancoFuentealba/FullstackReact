// AuthContext: el puente entre authService y las pantallas. Guarda quién inició sesión
// y entrega funciones para entrar, registrarse y salir. "esAdmin" sirve para proteger
// el panel de administración.
import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => authService.obtenerSesion());
  const [validandoSesion, setValidandoSesion] = useState(() => Boolean(authService.obtenerToken()));

  useEffect(() => {
    let activo = true;

    async function validar() {
      if (!authService.obtenerToken()) {
        setValidandoSesion(false);
        return;
      }
      try {
        const perfil = await authService.verificarSesionActual();
        if (activo) setUsuario(perfil);
      } catch {
        // Si hubo un fallo temporal de red, conserva el estado actual sin romper la app
      } finally {
        if (activo) setValidandoSesion(false);
      }
    }

    validar();
    return () => {
      activo = false;
    };
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
      const creado = await authService.registrarUsuario(datos);
      return { ok: true, usuario: creado };
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
    validandoSesion,
    estaLogueado: usuario !== null,
    esAdmin: usuario?.rol === 'admin',
    esVendedor: usuario?.rol === 'vendedor',
    puedeGestionar: usuario?.rol === 'admin' || usuario?.rol === 'vendedor',
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