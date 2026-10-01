import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavbarAudioMax = () => {
    return (
<<<<<<< HEAD
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
=======
        <Navbar variant="dark" expand="lg" className="navbar-audiomax">
            <Container>
                {/* 'as={Link}' para que el clic no recargue la página */}
                <Navbar.Brand as={Link} to="/" className="brand-audiomax">AudioMax</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" className="nav-link-audiomax">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/catalogo" className="nav-link-audiomax">Catálogo</Nav.Link>
                        <Nav.Link as={Link} to="/login" className="nav-link-login">Iniciar sesion</Nav.Link>
>>>>>>> d1100eb703d0a399d03a2a05c6b65a8716013eab
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}