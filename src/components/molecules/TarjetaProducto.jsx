import Image from '../atoms/Image.jsx';
import EtiquetaStock from '../atoms/EtiquetaStock.jsx';
import Precio from '../atoms/Precio.jsx';
import Boton from '../atoms/Boton.jsx';

function TarjetaProducto(props) {
    const { nombre, marca, modelo, precio, stock, imagen } = props.producto;
    const disponible = stock > 0;

    function alAgregar() {
        if (props.onAgregar) {
            props.onAgregar(props.producto);
        }
    }

    return (
        <div className="tarjeta-audiomax">
            <div className="contenedor-imagen">
                {!disponible && (
                    <EtiquetaStock estado="agotado" texto="Agotado" className="badge-tarjeta" />
                )}
                <Image src={imagen} alt={nombre} variante="producto" className="imagen-producto" />
            </div>

            <div className="cuerpo-tarjeta">
                <h5 className="titulo-producto">{nombre}</h5>
                <p className="marca-producto">{marca} · {modelo}</p>
                <h6 className="precio-producto">
                    <Precio valor={precio} />
                </h6>
                  <p className={`stock-producto ${disponible ? '' : 'stock-producto-agotado'}`}>
                    {disponible ? `Stock: ${stock}` : 'Sin stock'}
                </p>

                {props.onAgregar && (
                    <Boton
                        texto={disponible ? 'Agregar al carrito' : 'Sin stock'}
                        className="boton-agregar"
                        deshabilitado={!disponible}
                        onClick={alAgregar}
                    />
                )}
            </div>
        </div>
    );
}

export default TarjetaProducto;
