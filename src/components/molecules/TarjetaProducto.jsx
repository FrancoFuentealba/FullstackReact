import React from 'react';
import BotonAgregar from '../atoms/BotonAgregar.jsx';

// Recibe el producto completo (ver src/data/productos.js) y una función opcional onAgregar.
function TarjetaProducto({ producto, onAgregar }) {
    const { nombre, marca, modelo, precio, stock, imagen } = producto;
    const agotado = stock === 0;

    return (
        <div className="tarjeta-audiomax">
            <img src={imagen} alt={nombre} className="imagen-producto" />
            <h5>{nombre}</h5>
            <p className="marca-producto">{marca} · {modelo}</p>
            <h6 className="text-primary">${precio.toLocaleString('es-CL')}</h6>
            <p className={`stock-producto ${agotado ? 'stock-agotado' : ''}`}>
                {agotado ? 'Agotado' : `Stock: ${stock}`}
            </p>
            <BotonAgregar
                texto="Agregar al carrito"
                onClick={onAgregar}
                disabled={agotado}
            />
        </div>
    );
}

export default TarjetaProducto;