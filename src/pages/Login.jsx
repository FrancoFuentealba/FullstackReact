import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/organisms/LoginForm';
import PlantillaPublica from '../components/templates/PlantillaPublica';

function PaginaLogin() {
    const navigate = useNavigate();

    // Todavía no hay backend: al validar correctamente se vuelve al inicio.
    function alIniciarSesion(credenciales) {
        console.log('Inicio de sesión:', credenciales.email);
        navigate('/');
    }

    return (
        <PlantillaPublica>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={5}>
                        <div className="login-card">
                            <LoginForm onEnviar={alIniciarSesion} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaLogin;
