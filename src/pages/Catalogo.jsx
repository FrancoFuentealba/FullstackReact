import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TarjetaProducto from "../components/molecules/TarjetaProducto.jsx";
import { productosData } from "../data/productos.js";
import { PlantillaPublica } from "../components/templates/PlantillaPublica.jsx";

export const Catalogo = () => {
  return (
    <PlantillaPublica>
      <Container className="catalogo-contenedor">
        {/* Encabezado: título a la izquierda y botón volver a la derecha */}
        <div className="catalogo-header">
          <h2 className="catalogo-titulo">Catálogo de Productos</h2>
          <Link to="/" className="btn-volver-audiomax">
            ← Volver al Inicio
          </Link>
        </div>

        <Row xs={1} sm={2} md={3} lg={4} className="catalogo-grilla">
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
