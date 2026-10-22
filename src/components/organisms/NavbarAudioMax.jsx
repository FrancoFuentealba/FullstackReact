import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import BarraBusqueda from '../molecules/BarraBusqueda';

function NavbarAudioMax(props) {
    const cantidad = props.cantidadCarrito ?? 0;
    const usuario = props.usuario || null;
    const esAdmin = usuario?.rol === 'admin';
    const primerNombre = usuario ? usuario.nombre.split(' ')[0] : '';

    function ir(evento, ruta) {
        evento.preventDefault();
        if (props.onNavegar) {
            props.onNavegar(ruta);
        }
    }

    function alCerrarSesion(evento) {
        evento.preventDefault();
        if (props.onCerrarSesion) {
            props.onCerrarSesion();
        }
    }

    return (
        <Navbar variant="dark" expand="lg" className="navbar-audiomax">
            <Container>

                <Navbar.Brand href="/" onClick={(e) => ir(e, '/')} className="brand-audiomax">AudioMax</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <BarraBusqueda onBuscar={props.onBuscar} />
                    <Nav className="ms-auto">
                        <Nav.Link href="/" onClick={(e) => ir(e, '/')} className="nav-link-audiomax">Inicio</Nav.Link>
                        <Nav.Link href="/catalogo" onClick={(e) => ir(e, '/catalogo')} className="nav-link-audiomax">Catálogo</Nav.Link>
                        <Nav.Link href="/ofertas" onClick={(e) => ir(e, '/ofertas')} className="nav-link-audiomax">Ofertas</Nav.Link>
                        <Nav.Link href="/categorias" onClick={(e) => ir(e, '/categorias')} className="nav-link-audiomax">Categorías</Nav.Link>
                        <Nav.Link href="/carrito" onClick={(e) => ir(e, '/carrito')} className="nav-link-audiomax">
                            Carrito
                            {cantidad > 0 && (
                                <Badge className="badge-carrito">{cantidad}</Badge>
                            )}
                        </Nav.Link>

                        {usuario ? (
                            <>
                                <span className="navbar-saludo">Hola, {primerNombre}</span>

                                {esAdmin ? (
                                    <Nav.Link href="/admin/productos" onClick={(e) => ir(e, '/admin/productos')} className="nav-link-audiomax">Admin</Nav.Link>
                                ) : (
                                    <Nav.Link href="/mis-pedidos" onClick={(e) => ir(e, '/mis-pedidos')} className="nav-link-audiomax">Mis pedidos</Nav.Link>
                                )}

                                <Nav.Link href="/" onClick={alCerrarSesion} className="nav-link-salir">Cerrar sesión</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link href="/login" onClick={(e) => ir(e, '/login')} className="nav-link-login">Iniciar sesion</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarAudioMax;