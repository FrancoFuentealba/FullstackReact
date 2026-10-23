import Image from '../atoms/Image';
import Precio from '../atoms/Precio';
import ContadorCantidad from '../atoms/ContadorCantidad';
import Boton from '../atoms/Boton';
import { precioFinal } from '../../utils/ofertas';

function ItemCarrito(props) {
    const { nombre, marca, modelo, imagen } = props.producto;
    const precioUnitario = precioFinal(props.producto);
    const cantidad = props.cantidad ?? 1;

    return (
        <div className="item-carrito">
            <Image src={imagen} alt={nombre} variante="miniatura" className="item-carrito-img" />

            <div className="item-carrito-info">
                <h6 className="item-carrito-nombre">{nombre}</h6>
                <p className="item-carrito-detalle">{marca} · {modelo}</p>
                <Precio valor={precioUnitario} />
            </div>

            <ContadorCantidad
                valor={cantidad}
                onSumar={props.onSumar}
                onRestar={props.onRestar}
                className="item-carrito-contador"
            />

            <div className="item-carrito-subtotal">
                <span className="item-carrito-subtotal-titulo">Subtotal</span>
                <Precio valor={precioUnitario * cantidad} />
            </div>

            <Boton
                texto="Quitar"
                variante="outline-danger"
                onClick={props.onEliminar}
            />
        </div>
    );
}

export default ItemCarrito;