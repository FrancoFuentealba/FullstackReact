import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import Precio from '../components/atoms/Precio';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaCompraExitosa() {
    useTituloPagina('Compra exitosa');
    const navigate = useNavigate();
    const { state } = useLocation();
    const pedido = state?.pedido;

    // Si entran escribiendo la URL, no hay ninguna compra reciente que mostrar
    if (!pedido) {
        return (
            <PlantillaPublica>
                <Container>
                    <div className="resultado-compra">
                        <h2 className="resultado-compra-titulo">No hay una compra reciente</h2>
                        <Boton texto="Ir al catálogo" onClick={() => navigate('/catalogo')} />
                    </div>
                </Container>
            </PlantillaPublica>
        );
    }

    return (
        <PlantillaPublica>
            <Container>
                <div className="resultado-compra resultado-compra-exito">
                    <p className="resultado-compra-icono">✅</p>
                    <h2 className="resultado-compra-titulo">¡Compra exitosa!</h2>
                    <p className="resultado-compra-texto">
                        Gracias, {pedido.cliente.nombre}. Tu pedido está en preparación.
                    </p>

                    <dl className="resultado-compra-datos">
                        <dt>N° de pedido</dt>
                        <dd>{pedido.id}</dd>
                        <dt>Total pagado</dt>
                        <dd><Precio valor={pedido.total} /></dd>
                    </dl>

                    <div className="resultado-compra-acciones">
                        <Boton texto="Ver mis pedidos" onClick={() => navigate('/mis-pedidos')} />
                        <Boton texto="Seguir comprando" variante="secondary" onClick={() => navigate('/catalogo')} />
                    </div>
                </div>
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaCompraExitosa;