import { Link } from 'react-router-dom';
import ItemCarrito from '../molecules/ItemCarrito.jsx';
import Precio from '../atoms/Precio.jsx';

function Carrito(props) {
    const items = props.items || [];

    if (items.length === 0) {
        return (
            <section className="carrito-vacio">
                <h2 className="carrito-titulo">Tu carrito está vacío</h2>
                <p>Agrega productos desde el catálogo.</p>
                <Link to="/catalogo" className="btn-volver-audiomax">
                    Ir al catálogo
                </Link>
            </section>
        );
    }

    return (
        <section className="carrito">
            <h2 className="carrito-titulo">Tu carrito</h2>

            {items.map((item) => (
                <ItemCarrito
                    key={item.producto.codigo}
                    producto={item.producto}
                    cantidad={item.cantidad}
                    alSumar={() => props.alSumar(item.producto.codigo)}
                    alRestar={() => props.alRestar(item.producto.codigo)}
                    alEliminar={() => props.alQuitar(item.producto.codigo)}
                />
            ))}

            <div className="carrito-total">
                <span>Total</span>
                <Precio valor={props.total} />
            </div>
        </section>
    );
}

export default Carrito;