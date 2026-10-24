import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import Boton from '../atoms/Boton';
import { useAuth } from '../../context/AuthContext';

const SECCIONES = [
    { ruta: '/admin/productos', texto: 'Productos' },
    { ruta: '/admin/pedidos', texto: 'Pedidos' },
];

function PlantillaAdmin(props) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { esAdmin, cerrar } = useAuth();

    if (!esAdmin) {
        return <Navigate to="/login" replace state={{ aviso: 'No tienes permiso para entrar al panel de administración.' }} />;
    }

    function ir(evento, ruta) {
        evento.preventDefault();
        navigate(ruta);
    }

    function salir() {
        cerrar();
        navigate('/');
    }

    return (
        <Container className="admin-contenedor">
            <h1 className="admin-titulo-panel">Panel de administración</h1>

            <Nav variant="pills" className="admin-menu">
                {SECCIONES.map((seccion) => (
                    <Nav.Link
                        key={seccion.ruta}
                        href={seccion.ruta}
                        active={pathname === seccion.ruta}
                        onClick={(e) => ir(e, seccion.ruta)}
                    >
                        {seccion.texto}
                    </Nav.Link>
                ))}
                <Nav.Link href="/" onClick={(e) => ir(e, '/')}>← Ver tienda</Nav.Link>
                <Boton texto="Cerrar sesión" variante="outline-secondary" className="btn-sm ms-auto" onClick={salir} />
            </Nav>

            <main className="admin-contenido">{props.children}</main>
        </Container>
    );
}

export default PlantillaAdmin;