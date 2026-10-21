import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import DetalleProducto from '../components/organisms/DetalleProducto';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaDetalleProducto() {
    const { id } = useParams();            // "GTR-001" sale de /producto/GTR-001
    const navigate = useNavigate();
    const { productos } = useProductos();
    const { agregar } = useCarrito();

    const producto = productos.find((p) => p.codigo === id);

    // Los hooks siempre van ANTES de cualquier return
    useTituloPagina(producto ? producto.nombre : 'Producto no encontrado');

    if (!producto) {
        return (
            <PlantillaPublica>
                <Container className="detalle-contenedor">
                    <h2>Producto no encontrado</h2>
                    <p>El producto "{id}" no existe.</p>
                    <Boton texto="Ir al catálogo" onClick={() => navigate('/catalogo')} />
                </Container>
            </PlantillaPublica>
        );
    }

    return (
        <PlantillaPublica>
            <Container className="detalle-contenedor">
                <DetalleProducto
                    producto={producto}
                    onAgregar={agregar}
                    onVolver={() => navigate('/catalogo')}
                />
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaDetalleProducto;