import { Container } from 'react-bootstrap';
import Carrito from '../components/organisms/Carrito.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import { PlantillaPublica } from '../components/templates/PlantillaPublica.jsx';

function PaginaCarrito() {
    const { items, total, sumar, restar, quitar } = useCarrito();

    return (
        <PlantillaPublica>
            <Container className="carrito-contenedor">
                <Carrito
                    items={items}
                    total={total}
                    alSumar={sumar}
                    alRestar={restar}
                    alQuitar={quitar}
                />
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaCarrito;