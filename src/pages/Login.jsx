import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/organisms/LoginForm';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useAuth } from '../context/AuthContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaLogin() {
    useTituloPagina('Iniciar Sesion')
    const navigate = useNavigate();
    const { iniciar } = useAuth();
    const [error, setError] = useState('');

    function alIniciarSesion(datos) {
        const resultado = iniciar(datos.email, datos.clave);

        if (!resultado.ok) {
            setError(resultado.error);
            return;
        }

        setError('');
        navigate(resultado.usuario.rol === 'admin' ? '/admin/productos' : '/');
    }

    return (
        <PlantillaPublica>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={5}>
                        <div className="login-card">
                            <LoginForm onEnviar={alIniciarSesion} error={error} />
                            <p className="login-pie">
                                ¿No tienes cuenta?{' '}
                                <Link to="/registro" className="enlace-volver">Regístrate</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaLogin;