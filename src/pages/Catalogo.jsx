import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TarjetaProducto } from "../components/molecules/TarjetaProducto.jsx";
import { productosData } from "../data/productos.js";

export const Catalogo = () => {
  return (
    <Container className="catalogo-contenedor">
      <div className="catalogo-header">
        <Button as={Link} to="/" variant="outline-light">
          ← Volver al Inicio
        </Button>
      </div>

      <h2 className="catalogo-titulo">Catálogo de Productos</h2>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {productosData.map((producto) => (
          <Col key={producto.codigo}>
            <TarjetaProducto producto={producto} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};