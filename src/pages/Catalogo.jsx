import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TarjetaProducto } from "../components/molecules/TarjetaProducto.jsx";
import { productosData } from "../data/productos.js";
import { PlantillaPublica } from "../components/templates/PlantillaPublica.jsx";

export const Catalogo = () => {
  return (
    <PlantillaPublica>
      <Container className="catalogo-contenedor my-5">
        {/* NUEVO ENCABEZADO: Alinea título a la izquierda y botón a la derecha */}
        <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom border-secondary">
          <h2 className="mb-0 fw-bold seccion-titulo">
            Catálogo de Productos
          </h2>
          <Button as={Link} to="/" className="btn-volver-audiomax" variant="outline-light">
            ← Volver al Inicio
          </Button>
        </div>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {productosData.map((producto) => (
            <Col key={producto.codigo}>
              <TarjetaProducto producto={producto} />
            </Col>
          ))}
        </Row>
      </Container>
    </PlantillaPublica>
  );
};