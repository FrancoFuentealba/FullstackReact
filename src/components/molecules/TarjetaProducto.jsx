import React from 'react';
import { Card } from 'react-bootstrap';
import BotonAgregar from '../atoms/BotonAgregar.jsx';

function TarjetaProducto(props) {
    return (
        <div className="tarjeta-audiomax">
            <h5>{props.nombre}</h5>
            <p>{props.descripcion}</p>
            <h6 className="text-primary">{props.precio}</h6>
            <BotonAgregar texto="Agregar al carrito" onClick={props.onAgregar} />
        </div>
    )
}

export default TarjetaProducto;