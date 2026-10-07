import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TarjetaProducto from '../molecules/TarjetaProducto.jsx';

// Recibe una lista de productos y muestra una tarjeta por cada uno.
export const ProductGrid = ({ productos }) => {
    return (
        <Row xs={1} sm={2} md={3} lg={4} className="productos-grilla">
            {productos.map((producto) => (
                <Col key={producto.codigo}>
                    <TarjetaProducto producto={producto} />
                </Col>
            ))}
        </Row>
    );
};
