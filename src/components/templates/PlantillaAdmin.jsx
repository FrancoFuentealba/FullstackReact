import { Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

function PlantillaAdmin(props) {
    const { esAdmin } = useAuth();

    if (!esAdmin) {
        return <Navigate to="/login" replace state={{ aviso: 'No tienes permiso para entrar al panel de administración.' }} />;
    }

    return (
        <Container className="admin-contenedor">
            <h1 className="admin-titulo-panel">Panel de administración</h1>
            <main className="admin-contenido">{props.children}</main>
        </Container>
    );
}

export default PlantillaAdmin;