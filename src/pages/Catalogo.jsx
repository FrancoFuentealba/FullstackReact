
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CatalogoProductos from "../components/organisms/CatalogoProductos"; 
import { useProductos } from "../context/ProductosContext";
import { useCarrito } from "../context/CarritoContext";
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from "../hooks/useTitulopagina";


export const Catalogo = () => {
  useTituloPagina('Catalogo')
  const { agregar, cantidadTotal } = useCarrito();
  const { productos} = useProductos();


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

        <CatalogoProductos productos={productos} onAgregar={agregar} />
      </Container>
    </PlantillaPublica>
  );
}

export default Catalogo;