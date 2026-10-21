import Boton from '../atoms/Boton';

function TarjetaCategoria(props) {
    const nombre = props.nombre || "";
    const cantidad = props.cantidad || 0;

    function alSeleccionar() {
        if (props.onSeleccionar) {
            props.onSeleccionar(nombre);
        }
    }

    return (
        <div className="tarjeta-categoria">
            <h5 className="tarjeta-categoria-nombre">{nombre}</h5>
            <p className="tarjeta-categoria-cantidad">
                {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
            </p>
            <Boton texto="Ver productos" onClick={alSeleccionar} />
        </div>
    );
}

export default TarjetaCategoria;