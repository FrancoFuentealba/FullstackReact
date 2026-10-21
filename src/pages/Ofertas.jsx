import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductGrid from '../components/organisms/ProductGrid';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { tieneOferta } from '../utils/ofertas';

function PaginaOfertas() {
    useTituloPagina('Ofertas');
    const navigate = useNavigate();
    const { productos } = useProductos();
    const { agregar } = useCarrito();

    // Solo los productos con descuento, del mayor al menor
    const productosEnOferta = productos
        .filter((p) => tieneOferta(p))
        .sort((a, b) => b.descuento - a.descuento);

    function verDetalle(producto) {
        navigate(`/producto/${producto.codigo}`);
    }

    return (
        <PlantillaPublica>
            <Container className="catalogo-contenedor">
                <div className="catalogo-header">
                    <h2 className="catalogo-titulo">Ofertas</h2>
                </div>

                {productosEnOferta.length === 0 ? (
                    <p className="catalogo-cantidad">
                        Por ahora no hay productos en oferta.
                    </p>
                ) : (
                    <>
                        <p className="catalogo-cantidad">
                            {productosEnOferta.length}{' '}
                            {productosEnOferta.length === 1 ? 'producto' : 'productos'} en oferta
                        </p>
                        <ProductGrid
                            productos={productosEnOferta}
                            onAgregar={agregar}
                            onVerDetalle={verDetalle}
                        />
                    </>
                )}
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaOfertas;