import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import Boton from '../atoms/Boton';
import { useAuth } from '../../context/AuthContext';

// Qué roles ven cada sección del panel (el backend vuelve a validarlo con 401/403).
const SECCIONES = [
    { ruta: '/admin/productos', texto: 'Productos', roles: ['admin'] },
    { ruta: '/admin/usuarios', texto: 'Usuarios', roles: ['admin'] },
    { ruta: '/admin/inventario', texto: 'Inventario', roles: ['admin', 'vendedor'] },
    { ruta: '/admin/pedidos', texto: 'Pedidos', roles: ['admin', 'vendedor'] },
];

function PlantillaAdmin(props) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { usuario, cerrar } = useAuth();
    const roles = props.roles ?? ['admin', 'vendedor'];

    if (!usuario || !roles.includes(usuario.rol)) {
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
            <h1 className="admin-titulo-panel">{usuario.rol === 'vendedor' ? 'Panel de ventas' : 'Panel de administración'}</h1>

            <Nav variant="pills" className="admin-menu">
                {SECCIONES.filter((seccion) => seccion.roles.includes(usuario.rol)).map((seccion) => (
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