import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavbarAudioMax = () => {
    return (
        <Navbar variant="dark" expand="lg" className="navbar-audiomax">
            <Container>
                {/* 'as={Link}' para que el clic no recargue la página */}
                <Navbar.Brand as={Link} to="/" className="brand-audiomax">AudioMax</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="nav-link-audiomax">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/catalogo" className="nav-link-audiomax">Catálogo</Nav.Link>
                        <Nav.Link as={Link} to="/login" className="nav-link-login">Iniciar sesion</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}