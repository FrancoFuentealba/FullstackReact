import { Row, Col } from 'react-bootstrap';
import TarjetaCategoria from '../molecules/TarjetaCategoria';

// Recibe una lista de categorias [{ nombre, cantidad }] y muestra una tarjeta por cada una.
function GrillaCategorias(props) {
    const categorias = props.categorias || [];

    return (
        <Row xs={1} sm={2} md={3} className="categorias-grilla">
            {categorias.map((categoria) => (
                <Col key={categoria.nombre}>
                    <TarjetaCategoria
                        nombre={categoria.nombre}
                        cantidad={categoria.cantidad}
                        onSeleccionar={props.onSeleccionar}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default GrillaCategorias;