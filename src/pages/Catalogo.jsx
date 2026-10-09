import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CatalogoProductos from "../components/organisms/CatalogoProductos.jsx";import { productosData } from "../data/productos.js";
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

        <CatalogoProductos productos={productosData} />
      </Container>
    </PlantillaPublica>
  );
};