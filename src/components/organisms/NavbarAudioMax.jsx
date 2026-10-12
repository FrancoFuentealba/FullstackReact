
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';


function NavbarAudioMax(props) {
    const cantidad = props.cantidadCarrito ?? 0;

    function ir(evento, ruta) {
        evento.preventDefault();
        if (props.onNavegar){
            props.onNavegar(ruta);
        }
    }

    return (
        <Navbar variant="dark" expand="lg" className="navbar-audiomax">
            <Container>
                
                <Navbar.Brand href="/" onClick={(e) => ir(e, '/')} className="brand-audiomax">AudioMax</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/" onClick={(e) => ir(e, '/')} className="nav-link-audiomax">Inicio</Nav.Link>
                        <Nav.Link href="/catalogo" onClick={(e) => ir(e, '/catalogo')} className="nav-link-audiomax">Catálogo</Nav.Link>
                        <Nav.Link href="/carrito" onClick={(e) => ir(e, '/carrito')} className="nav-link-audiomax">
                            Carrito
                            {cantidad > 0 && (
                                <Badge className="badge-carrito">{cantidad}</Badge>
                            )}
                        </Nav.Link>
                        <Nav.Link href="/login" onClick={(e) => ir(e, '/login')} className="nav-link-login">Iniciar sesion</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarAudioMax;