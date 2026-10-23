import Boton from '../atoms/Boton';
import ItemCarrito from '../molecules/ItemCarrito';
import Precio from '../atoms/Precio';

function Carrito(props) {
    const items = props.items || [];

    if (items.length === 0) {
        return (
            <section className="carrito-vacio">
                <h2 className="carrito-titulo">Tu carrito está vacío</h2>
                <p>Agrega productos desde el catálogo.</p>
                <Boton texto="Ir al catálogo" onClick={props.onIrAlCatalogo} />
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
                    onSumar={() => props.onSumar(item.producto.codigo)}
                    onRestar={() => props.onRestar(item.producto.codigo)}
                    onEliminar={() => props.onQuitar(item.producto.codigo)}
                />
            ))}

            <div className="carrito-total">
                <span>Total</span>
                <Precio valor={props.total} />
            </div>

            {props.onIrAPagar && (
                <Boton texto="Ir a pagar" className="w-100 mt-3" onClick={props.onIrAPagar} />
            )}
        </section>
    );
}

export default Carrito;