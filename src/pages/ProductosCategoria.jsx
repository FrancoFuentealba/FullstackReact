import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductGrid from '../components/organisms/ProductGrid';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaProductosCategoria() {
    const { nombre } = useParams();          // "Audio" sale de /categorias/Audio
    useTituloPagina(nombre);
    const navigate = useNavigate();
    const { productos } = useProductos();
    const { agregar } = useCarrito();

    const productosCategoria = productos.filter((p) => p.categoria === nombre);

    function verDetalle(producto) {
        navigate(`/producto/${producto.codigo}`);
    }

    return (
        <PlantillaPublica>
            <Container className="catalogo-contenedor">
                <div className="catalogo-header">
                    <h2 className="catalogo-titulo">{nombre}</h2>
                    <Link to="/categorias" className="btn-volver-audiomax">
                        ← Volver a categorías
                    </Link>
                </div>

                {productosCategoria.length === 0 ? (
                    <p className="catalogo-cantidad">
                        No hay productos en la categoría "{nombre}".
                    </p>
                ) : (
                    <>
                        <p className="catalogo-cantidad">
                            {productosCategoria.length}{' '}
                            {productosCategoria.length === 1 ? 'producto' : 'productos'}
                        </p>
                        <ProductGrid
                            productos={productosCategoria}
                            onAgregar={agregar}
                            onVerDetalle={verDetalle}
                        />
                    </>
                )}
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaProductosCategoria;