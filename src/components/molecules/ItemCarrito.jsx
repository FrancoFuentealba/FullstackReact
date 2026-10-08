import Image from '../atoms/Image.jsx';
import Precio from '../atoms/Precio.jsx';
import ContadorCantidad from '../atoms/ContadorCantidad.jsx';
import Boton from '../atoms/Boton.jsx';

function ItemCarrito(props) {
    const { nombre, marca, modelo, precio, imagen } = props.producto;
    const cantidad = props.cantidad || 1;

    return (
        <div className="item-carrito">
            <Image src={imagen} alt={nombre} variante="miniatura" className="item-carrito-img" />

            <div className="item-carrito-info">
                <h6 className="item-carrito-nombre">{nombre}</h6>
                <p className="item-carrito-detalle">{marca} · {modelo}</p>
                <Precio valor={precio} />
            </div>

            <ContadorCantidad
                valor={cantidad}
                onSumar={props.alSumar}
                onRestar={props.alRestar}
                className="item-carrito-contador"
            />

            <div className="item-carrito-subtotal">
                <span className="item-carrito-subtotal-titulo">Subtotal</span>
                <Precio valor={precio * cantidad} />
            </div>

            <Boton
                texto="Quitar"
                variante="outline-danger"
                onClick={props.alEliminar}
            />
        </div>
    );
}

export default ItemCarrito;