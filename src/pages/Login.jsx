import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import LoginForm from '../components/organisms/LoginForm';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useAuth } from '../context/AuthContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaLogin() {
  useTituloPagina('Iniciar Sesion');
  const navigate = useNavigate();
  const { state } = useLocation();
  const aviso = state?.aviso;
  const { iniciar } = useAuth();

  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);

  async function alIniciarSesion(datos) {
    if (cargando) return;
    setCargando(true);
    setError('');
    setExito('');

    const resultado = await iniciar(datos.email, datos.clave);
    setCargando(false);

    if (!resultado.ok) {
      setError(resultado.error);
      return;
    }

    setExito(`Bienvenido, ${resultado.usuario.nombre}. Redirigiendo...`);
    const destino =
      resultado.usuario.rol === 'admin'
        ? '/admin/productos'
        : resultado.usuario.rol === 'vendedor'
          ? '/admin/pedidos'
          : '/';

    setTimeout(() => navigate(destino), 600);
  }

  return (
    <PlantillaPublica>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <div className="login-card">
              {aviso && <p className="login-aviso-permiso">{aviso}</p>}
              {cargando && (
                <Alert variant="info" className="d-flex align-items-center gap-2" role="status">
                  <Spinner animation="border" size="sm" />
                  <span>Verificando credenciales...</span>
                </Alert>
              )}
              {exito && <Alert variant="success" role="status">{exito}</Alert>}

              <LoginForm onEnviar={alIniciarSesion} error={error} cargando={cargando} />

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