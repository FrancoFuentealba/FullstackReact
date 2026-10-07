import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TarjetaProducto from "../components/molecules/TarjetaProducto.jsx";
import { PlantillaPublica } from "../components/templates/PlantillaPublica.jsx";

function Inicio(props) {

  const productosDestacados = props.productos ? props.productos.slice(0, 4) : [];

  return (
    <PlantillaPublica>
      <Container className="inicio-contenedor">
        <div className="hero-banner">
          <h1 className="hero-titulo">Bienvenido a AudioMax</h1>
          <p className="hero-subtitulo">Equipamiento musical y audio profesional de calidad.</p>
          <Link to="/catalogo" className="btn-audiomax hero-boton">Explorar catálogo</Link>
        </div>

        {/* Sección de Productos Destacados */}
        <section className="seccion-destacados">
          <h2 className="seccion-titulo">Productos Destacados</h2>
          <Row className="destacados-grilla">
            {productosDestacados.map((producto) => (
              <Col key={producto.codigo} xs={12} sm={6} md={4} lg={3}>
                <TarjetaProducto producto={producto} />
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </PlantillaPublica>
  );
}

export default Inicio;
