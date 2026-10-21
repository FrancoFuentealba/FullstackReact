import { Row, Col } from 'react-bootstrap';
import Image from '../atoms/Image';
import Precio from '../atoms/Precio';
import EtiquetaStock from '../atoms/EtiquetaStock';
import Boton from '../atoms/Boton';
import { hayStock } from '../../utils/stock';
import EtiquetaOferta from '../atoms/EtiquetaOferta';
import { tieneOferta, precioFinal } from '../../utils/ofertas';

function DetalleProducto(props) {
    const { nombre, marca, modelo, categoria, codigo, precio, stock, imagen } = props.producto;
    const disponible = hayStock(props.producto);
    const enOferta = tieneOferta(props.producto);

    function alAgregar() {
        if (props.onAgregar) {
            props.onAgregar(props.producto);
        }
    }

    return (
        <Row className="detalle-producto">
            <Col md={6}>
                <div className="detalle-imagen-contenedor">
                    <Image src={imagen} alt={nombre} variante="producto" className="detalle-imagen" />
                </div>
            </Col>

            <Col md={6}>
                <p className="detalle-categoria">{categoria}</p>
                <h2 className="detalle-titulo">{nombre}</h2>
                <p className="marca-producto">{marca} · {modelo}</p>
                <p className="detalle-codigo">Código: {codigo}</p>

                <h3 className="precio-producto">
                    {enOferta ? (
                        <>
                            <Precio valor={precio} variante="tachado" />
                            <Precio valor={precioFinal(props.producto)} variante="oferta" className="ms-2" />
                            <EtiquetaOferta texto={`-${props.producto.descuento}%`} className="ms-2" />
                        </>
                    ) : (
                        <Precio valor={precio} />
                    )}
                </h3>
                <EtiquetaStock
                    estado={disponible ? 'disponible' : 'agotado'}
                    texto={disponible ? `Stock: ${stock}` : 'Agotado'}
                />

                <div className="detalle-acciones">
                    {props.onAgregar && (
                        <Boton
                            texto={disponible ? 'Agregar al carrito' : 'Sin stock'}
                            deshabilitado={!disponible}
                            onClick={alAgregar}
                        />
                    )}
                    {props.onVolver && (
                        <Boton texto="← Volver" variante="outline-light" onClick={props.onVolver} />
                    )}
                </div>
            </Col>
        </Row>
    );
}

export default DetalleProducto;