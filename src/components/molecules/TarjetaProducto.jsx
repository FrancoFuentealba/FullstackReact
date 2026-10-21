import Image from '../atoms/Image';
import EtiquetaStock from '../atoms/EtiquetaStock';
import EtiquetaOferta from '../atoms/EtiquetaOferta';
import Precio from '../atoms/Precio';
import Boton from '../atoms/Boton';
import { hayStock } from '../../utils/stock';
import { tieneOferta, precioFinal } from '../../utils/ofertas';

function TarjetaProducto(props) {
    const { nombre, marca, modelo, precio, stock, imagen } = props.producto;
    const disponible = hayStock(props.producto);
    const enOferta = tieneOferta(props.producto);

    function alAgregar() {
        if (props.onAgregar) {
            props.onAgregar(props.producto);
        }
    }

    function alVerDetalle() {
        if (props.onVerDetalle) {
            props.onVerDetalle(props.producto);
        }
    }

    return (
        <div className="tarjeta-audiomax">
            <div className="contenedor-imagen">
                {!disponible && (
                    <EtiquetaStock estado="agotado" texto="Agotado" className="badge-tarjeta" />
                )}
                {enOferta && (
                    <EtiquetaOferta texto={`-${props.producto.descuento}%`} className="badge-oferta" />
                )}
                <Image src={imagen} alt={nombre} variante="producto" className="imagen-producto" />
            </div>

            <div className="cuerpo-tarjeta">
                <h5 className="titulo-producto">{nombre}</h5>
                <p className="marca-producto">{marca} · {modelo}</p>
                <h6 className="precio-producto">
                    {enOferta ? (
                        <>
                            <Precio valor={precio} variante="tachado" />
                            <Precio valor={precioFinal(props.producto)} variante="oferta" className="ms-2" />
                        </>
                    ) : (
                        <Precio valor={precio} />
                    )}
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
                {props.onVerDetalle && (
                    <Boton
                        texto="Ver detalle"
                        className="boton-ver-detalle"
                        onClick={alVerDetalle}
                    />
                )}
            </div>
        </div>
    );
}

export default TarjetaProducto;