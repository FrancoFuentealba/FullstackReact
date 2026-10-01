import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PlantillaPublica } from '../components/templates/PlantillaPublica.jsx';
import { TarjetaProducto } from '../components/molecules/TarjetaProducto.jsx';
import { productosData } from '../data/productos.js';

export const Catalogo = () => {
    return (
        <PlantillaPublica>
            <Container className="my-5 contenedor-catalogo">
                <h2 className="mb-4 titulo-catalago">Catálogo de Instrumentos</h2>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {productosData.map((producto) => (
                        <Col key={producto.codigo}>
                            <TarjetaProducto producto={producto} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </PlantillaPublica>
    )
}