import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Carrito from '../components/organisms/Carrito';
import { useCarrito } from '../context/CarritoContext';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from '../hooks/useTitulopagina';

function PaginaCarrito() {
    useTituloPagina('CArrito')
    const navigate = useNavigate();
    const { items, total, sumar, restar, quitar } = useCarrito();

    return (
        <PlantillaPublica>
            <Container className="carrito-contenedor">
                <Carrito
                    items={items}
                    total={total}
                    onSumar={sumar}
                    onRestar={restar}
                    onQuitar={quitar}
                    onIrAlCatalogo={() => navigate('/catalogo')}
                />
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaCarrito;
