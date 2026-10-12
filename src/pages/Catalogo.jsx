
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CatalogoProductos from "../components/organisms/CatalogoProductos"; 
import { productosData } from "../data/productos.js";
import { useCarrito } from "../context/CarritoContext";
import PlantillaPublica from '../components/templates/PlantillaPublica';


export const Catalogo = () => {
  const { agregar, cantidadTotal } = useCarrito();


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

        <p className="catalogo-cantidad">🛒 {cantidadTotal} en el carrito</p>

        <CatalogoProductos productos={productosData} onAgregar={agregar} />
      </Container>
    </PlantillaPublica>
  );
};