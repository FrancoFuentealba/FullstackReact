import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaCompraFallida() {
    useTituloPagina('Compra fallida');
    const navigate = useNavigate();
    const { state } = useLocation();
    const error = state?.error || 'No se pudo completar la compra.';

    return (
        <PlantillaPublica>
            <Container>
                <div className="resultado-compra resultado-compra-error">
                    <p className="resultado-compra-icono">❌</p>
                    <h2 className="resultado-compra-titulo">No pudimos completar tu compra</h2>
                    <p className="resultado-compra-texto">{error}</p>
                    <p className="resultado-compra-nota">No se hizo ningún cobro y tu carrito sigue intacto.</p>

                    <div className="resultado-compra-acciones">
                        <Boton texto="Volver al carrito" onClick={() => navigate('/carrito')} />
                        <Boton texto="Seguir comprando" variante="secondary" onClick={() => navigate('/catalogo')} />
                    </div>
                </div>
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaCompraFallida;