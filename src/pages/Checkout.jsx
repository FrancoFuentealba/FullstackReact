import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import FormularioCheckout from '../components/organisms/FormularioCheckout';
import ResumenCompra from '../components/organisms/ResumenCompra';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { usePedidos } from '../context/PedidosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaCheckout() {
    useTituloPagina('Checkout');
    const navigate = useNavigate();
    const { items, total } = useCarrito();
    const { usuario } = useAuth();
    const { confirmarCompra } = usePedidos();

    function alPagar(cliente) {
        const resultado = confirmarCompra(cliente);

        if (resultado.ok) {
            navigate('/compra-exitosa', { state: { pedido: resultado.pedido } });
        } else {
            navigate('/compra-fallida', { state: { error: resultado.error } });
        }
    }

    // Guardia 1: hay que iniciar sesión para pagar
    if (!usuario) {
        return (
            <PlantillaPublica>
                <Container className="checkout-contenedor">
                    <h2 className="checkout-titulo">Inicia sesión para pagar</h2>
                    <p className="checkout-aviso">Necesitamos tu cuenta para asociar el pedido a tu correo.</p>
                    <Boton texto="Iniciar sesión" onClick={() => navigate('/login')} />
                </Container>
            </PlantillaPublica>
        );
    }

    // Guardia 2: no hay nada que pagar
    if (items.length === 0) {
        return (
            <PlantillaPublica>
                <Container className="checkout-contenedor">
                    <h2 className="checkout-titulo">No hay productos para pagar</h2>
                    <p className="checkout-aviso">Agrega productos desde el catálogo.</p>
                    <Boton texto="Ir al catálogo" onClick={() => navigate('/catalogo')} />
                </Container>
            </PlantillaPublica>
        );
    }

    return (
        <PlantillaPublica>
            <Container className="checkout-contenedor">
                <h2 className="checkout-titulo">Finalizar compra</h2>
                <Row className="g-4">
                    <Col md={7}>
                        <FormularioCheckout onPagar={alPagar} />
                    </Col>
                    <Col md={5}>
                        <ResumenCompra items={items} total={total} />
                    </Col>
                </Row>
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaCheckout;