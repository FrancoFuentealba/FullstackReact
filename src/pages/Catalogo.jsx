import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PlantillaPublica } from '../components/templates/PlantillaPublica.jsx';
import { TarjetaProducto } from '../components/molecules/TarjetaProducto.jsx';
<<<<<<< HEAD
import { productos } from '../data/productos.js';
=======
import { productosData } from '../data/productos.js';
>>>>>>> d1100eb703d0a399d03a2a05c6b65a8716013eab

export const Catalogo = () => {
    return (
        <PlantillaPublica>
<<<<<<< HEAD
            <Container className="my-5">
                <h2 className="mb-4">Catálogo de Instrumentos</h2>
=======
            <Container className="my-5 contenedor-catalogo">
                <h2 className="mb-4 titulo-catalago">Catálogo de Instrumentos</h2>
>>>>>>> d1100eb703d0a399d03a2a05c6b65a8716013eab
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