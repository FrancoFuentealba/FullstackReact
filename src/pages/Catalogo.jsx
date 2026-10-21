import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";          
import CatalogoProductos from "../components/organisms/CatalogoProductos";
import { useProductos } from "../context/ProductosContext";
import { useCarrito } from "../context/CarritoContext";
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from "../hooks/useTituloPagina";


export const Catalogo = () => {
  useTituloPagina('Catalogo')
  const navigate = useNavigate();                               
  const { agregar, cantidadTotal } = useCarrito();
  const { productos } = useProductos();


  function verDetalle(producto) {
    navigate(`/producto/${producto.codigo}`);
  }

  return (
    <PlantillaPublica>
      <Container className="catalogo-contenedor">
        <div className="catalogo-header">
          <h2 className="catalogo-titulo">Catálogo de Productos</h2>
          <Link to="/" className="btn-volver-audiomax">
            ← Volver al Inicio
          </Link>
        </div>

        <p className="catalogo-cantidad">🛒 {cantidadTotal} en el carrito</p>

        <CatalogoProductos
          productos={productos}
          onAgregar={agregar}
          onVerDetalle={verDetalle}                              
        />
      </Container>
    </PlantillaPublica>
  );
}

export default Catalogo;