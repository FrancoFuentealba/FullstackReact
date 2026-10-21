import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import GrillaCategorias from '../components/organisms/GrillaCategorias';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaCategorias() {
    useTituloPagina('Categorías');
    const navigate = useNavigate();
    const { productos } = useProductos();

    // 1) nombres sin repetir
    const nombres = [...new Set(productos.map((p) => p.categoria))];

    // 2) por cada nombre, cuántos productos tiene
    const categorias = nombres.map((nombre) => ({
        nombre: nombre,
        cantidad: productos.filter((p) => p.categoria === nombre).length,
    }));

    function irACategoria(nombre) {
        navigate(`/categorias/${encodeURIComponent(nombre)}`);
    }

    return (
        <PlantillaPublica>
            <Container className="catalogo-contenedor">
                <div className="catalogo-header">
                    <h2 className="catalogo-titulo">Categorías</h2>
                </div>

                <GrillaCategorias
                    categorias={categorias}
                    onSeleccionar={irACategoria}
                />
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaCategorias;