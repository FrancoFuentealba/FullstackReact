import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import HeroSection from '../components/organisms/HeroSection';
import ProductGrid from '../components/organisms/ProductGrid';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useCarrito } from '../context/CarritoContext';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from "../hooks/useTituloPagina";

function Inicio() {
  useTituloPagina('Inicio')
  const navigate = useNavigate();
  const { agregar } = useCarrito();
  const { productos } = useProductos();

  const productosDestacados = productos.slice(0, 4);


  function verDetalle(producto) {
    navigate(`/producto/${producto.codigo}`);
  }

  return (
    <PlantillaPublica>
      <Container className="inicio-contenedor">
        <HeroSection
          titulo="Bienvenido a AudioMax"
          subtitulo="Equipamiento musical y audio profesional de calidad."
          textoBoton="Explorar catálogo"
          onBoton={() => navigate('/catalogo')}
        />

        <section className="seccion-destacados">
          <h2 className="seccion-titulo">Productos Destacados</h2>
          <ProductGrid
            productos={productosDestacados}
            onAgregar={agregar}
            onVerDetalle={verDetalle}                            
          />
        </section>
      </Container>
    </PlantillaPublica>
  );
}

export default Inicio;