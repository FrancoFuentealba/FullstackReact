// authService: usuarios y sesión. JavaScript puro (sin React), con localStorage.
// OJO: guardar claves en el navegador es solo para este proyecto (no hay backend).
// En un sistema real las claves se guardan cifradas en un servidor.

import { usuariosData } from '../data/usuarios.js';

const CLAVE_USUARIOS = 'usuarios';
const CLAVE_SESION = 'sesion';

function guardarUsuarios(lista) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
}

// La primera vez la lista sale de data/usuarios.js (administrador y cliente de prueba).
function leerUsuarios() {
    try {
        const lista = JSON.parse(localStorage.getItem(CLAVE_USUARIOS));
        if (Array.isArray(lista)) return lista;
    } catch {
        // texto dañado: se vuelve a los datos de partida
    }
    const iniciales = usuariosData.map((u) => ({ ...u }));
    guardarUsuarios(iniciales);
    return iniciales;
}

// Normaliza el correo para compararlo: sin espacios y en minúsculas.
function limpiarEmail(email) {
    return String(email ?? '').trim().toLowerCase();
}

// Lo que se guarda en la sesión y se entrega a las pantallas: NUNCA incluye la clave.
function sinClave({ nombre, email, rol }) {
    return { nombre, email, rol };
}

// Crea un cliente nuevo (rol "cliente"). Lanza un Error si falta un dato o el correo ya existe.
export function registrarUsuario({ nombre, email, clave }) {
    const correo = limpiarEmail(email);
    if (String(nombre ?? '').trim() === '' || correo === '' || String(clave ?? '') === '') {
        throw new Error('Nombre, correo y clave son obligatorios');
    }

    const usuarios = leerUsuarios();
    if (usuarios.some((u) => limpiarEmail(u.email) === correo)) {
        throw new Error('Ya existe una cuenta con ese correo');
    }

    const nuevo = { nombre: String(nombre).trim(), email: correo, clave, rol: 'cliente' };
    guardarUsuarios([...usuarios, nuevo]);
    return sinClave(nuevo);
}

// Revisa correo y clave. Si coinciden guarda la sesión y devuelve el usuario (sin clave);
// si no, lanza un Error (el mensaje es el mismo para correo o clave incorrectos, a propósito).
export function iniciarSesion(email, clave) {
    const correo = limpiarEmail(email);
    const usuario = leerUsuarios().find((u) => limpiarEmail(u.email) === correo && u.clave === clave);

    if (!usuario) {
        throw new Error('Correo o contraseña incorrectos');
    }

    const sesion = sinClave(usuario);
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
    return sesion;
}

export function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
}

// Devuelve el usuario con la sesión iniciada, o null (también si lo guardado está dañado).
export function obtenerSesion() {
    try {
        const sesion = JSON.parse(localStorage.getItem(CLAVE_SESION));
        return sesion && sesion.email && sesion.rol ? sesion : null;
    } catch {
        return null;
    }
}
