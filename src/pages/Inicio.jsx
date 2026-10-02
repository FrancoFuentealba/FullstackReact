import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TarjetaProducto } from "../components/molecules/TarjetaProducto.jsx";
import { productosData } from "../data/productos.js";
import { PlantillaPublica } from "../components/templates/PlantillaPublica.jsx";

export const Inicio = () => {
  // Obtenemos los primeros productos destacados
  const productosDestacados = productosData.slice(0, 4);

  return (
    <PlantillaPublica>
      <Container className="inicio-contenedor">
        {/* Banner Principal / Hero */}
        <div className="hero-banner">
          <h1 className="hero-titulo">Bienvenido a AudioMax</h1>
          <p className="hero-subtitulo">
            Equipamiento musical y audio profesional de la más alta calidad.
          </p>
          <Button as={Link} to="/catalogo" className="btn-audiomax hero-boton">
            Explorar Catálogo
          </Button>
        </div>

        {/* Sección de Productos Destacados */}
        <section className="seccion-destacados">
          <h2 className="seccion-titulo">Productos Destacados</h2>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {productosDestacados.map((producto) => (
              <Col key={producto.codigo}>
                <TarjetaProducto producto={producto} />
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </PlantillaPublica>
  );
};
