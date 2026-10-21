import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductGrid from '../components/organisms/ProductGrid';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { filtrarProductos } from '../utils/busqueda';

function PaginaBuscar() {
    const [parametros] = useSearchParams();
    const termino = parametros.get('q') || '';     // "guitarra" sale de /buscar?q=guitarra

    useTituloPagina(termino ? `Buscar: ${termino}` : 'Buscar');
    const navigate = useNavigate();
    const { productos } = useProductos();
    const { agregar } = useCarrito();

    const resultados = filtrarProductos(productos, termino);

    function verDetalle(producto) {
        navigate(`/producto/${producto.codigo}`);
    }

    return (
        <PlantillaPublica>
            <Container className="catalogo-contenedor">
                <div className="catalogo-header">
                    <h2 className="catalogo-titulo">
                        {termino ? `Resultados para "${termino}"` : 'Buscar'}
                    </h2>
                </div>

                {termino === '' ? (
                    <p className="catalogo-cantidad">
                        Escribe algo en el buscador para encontrar productos.
                    </p>
                ) : resultados.length === 0 ? (
                    <p className="catalogo-cantidad">
                        No encontramos productos para "{termino}". Prueba con otra palabra.
                    </p>
                ) : (
                    <>
                        <p className="catalogo-cantidad">
                            {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}
                        </p>
                        <ProductGrid
                            productos={resultados}
                            onAgregar={agregar}
                            onVerDetalle={verDetalle}
                        />
                    </>
                )}
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaBuscar;