import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import RegistroForm from '../components/organisms/RegistroForm';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useAuth } from '../context/AuthContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaRegistro() {
  useTituloPagina('Crear cuenta');
  const navigate = useNavigate();
  const { registrar, iniciar } = useAuth();

  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);

  async function alRegistrar(datos) {
    if (cargando) return;
    setCargando(true);
    setError('');
    setExito('');

    const registro = await registrar(datos);
    if (!registro.ok) {
      setCargando(false);
      setError(registro.error);
      return;
    }

    const sesion = await iniciar(datos.email, datos.clave);
    setCargando(false);

    if (!sesion.ok) {
      setExito('Cuenta creada correctamente. Ya puedes iniciar sesión.');
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    setExito('Cuenta creada con éxito. Redirigiendo a la tienda...');
    setTimeout(() => navigate('/'), 700);
  }

  return (
    <PlantillaPublica>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <div className="login-card">
              {cargando && (
                <Alert variant="info" className="d-flex align-items-center gap-2" role="status">
                  <Spinner animation="border" size="sm" />
                  <span>Creando tu cuenta...</span>
                </Alert>
              )}
              {exito && <Alert variant="success" role="status">{exito}</Alert>}

              <RegistroForm onEnviar={alRegistrar} error={error} cargando={cargando} />

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