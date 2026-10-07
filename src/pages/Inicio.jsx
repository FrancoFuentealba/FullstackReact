import React from "react";
import { Container } from "react-bootstrap";
import { HeroSection } from "../components/organisms/HeroSection.jsx";
import { ProductGrid } from "../components/organisms/ProductGrid.jsx";
import { PlantillaPublica } from "../components/templates/PlantillaPublica.jsx";

function Inicio(props) {

  const productosDestacados = props.productos ? props.productos.slice(0, 4) : [];

  return (
    <PlantillaPublica>
      <Container className="inicio-contenedor">
        <HeroSection
          titulo="Bienvenido a AudioMax"
          subtitulo="Equipamiento musical y audio profesional de calidad."
          textoBoton="Explorar catálogo"
          rutaBoton="/catalogo"
        />

        {/* Sección de Productos Destacados */}
        <section className="seccion-destacados">
          <h2 className="seccion-titulo">Productos Destacados</h2>
          <ProductGrid productos={productosDestacados} />
        </section>
      </Container>
    </PlantillaPublica>
  );
}

export default Inicio;