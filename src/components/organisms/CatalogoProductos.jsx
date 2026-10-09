import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import FiltroCategoria from '../molecules/FiltroCategoria.jsx';
import TarjetaProducto from '../molecules/TarjetaProducto.jsx';

function CatalogoProductos(props) {
    const productos = props.productos || [];
    const [categoria, setCategoria] = useState('todas');

    const categorias = [...new Set(productos.map((p) => p.categoria))];

    const productosVisibles =
        categoria === 'todas'
            ? productos
            : productos.filter((p) => p.categoria === categoria);

    return (
        <section className="catalogo-productos">
            <FiltroCategoria
                categorias={categorias}
                valor={categoria}
                alCambiar={setCategoria}
            />

            <p className="catalogo-cantidad">
                {productosVisibles.length} {productosVisibles.length === 1 ? 'producto' : 'productos'}
            </p>

            <Row xs={1} sm={2} md={3} lg={4} className="productos-grilla">
                {productosVisibles.map((producto) => (
                    <Col key={producto.codigo}>
                        <TarjetaProducto producto={producto} onAgregar={props.onAgregar} />
                    </Col>
                ))}
            </Row>
        </section>
    );
}

export default CatalogoProductos;