import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// Enlace de navegación. NavLink agrega la clase "active" cuando la ruta coincide.
// variante: "normal" (por defecto) o "login" (estilo botón).
function NavItem({ to, texto, variante = 'normal', end = false }) {
    const clase = variante === 'login' ? 'nav-link-login' : 'nav-link-audiomax';

    return (
        <Nav.Link as={NavLink} to={to} end={end} className={clase}>
            {texto}
        </Nav.Link>
    );
}

export default NavItem;