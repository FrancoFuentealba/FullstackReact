import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import RegistroForm from '../components/organisms/RegistroForm';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useAuth } from '../context/AuthContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaRegistro() {
    useTituloPagina('Crear cuenta');
    const navigate = useNavigate();
    const { registrar, iniciar } = useAuth();
    const [error, setError] = useState('');

    async function alRegistrar(datos) {
        const registro = await registrar(datos);

        if (!registro.ok) {
            setError(registro.error);
            return;
        }

        const entrada = await iniciar(datos.email, datos.clave);

        if (!entrada.ok) {
            setError(entrada.error);
            return;
        }

        setError('');
        navigate('/');
    }

    return (
        <PlantillaPublica>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={5}>
                        <div className="login-card">
                            <RegistroForm onEnviar={alRegistrar} error={error} />
                            <p className="login-pie">
                                ¿Ya tienes cuenta?{' '}
                                <Link to="/login" className="enlace-volver">Inicia sesión</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaRegistro;
