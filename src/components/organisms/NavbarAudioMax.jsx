import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavbarAudioMax = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                {/* 'as={Link}' para que el clic no recargue la página */}
                <Navbar.Brand as={Link} to="/">AudioMax</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
                        <Nav.Link as={Link} to="/login">Iniciar sesion</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}