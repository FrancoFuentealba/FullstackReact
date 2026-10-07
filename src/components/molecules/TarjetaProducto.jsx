import React from 'react';
import BotonAgregar from '../atoms/BotonAgregar.jsx';

// Recibe el producto completo (ver src/data/productos.js) y una función opcional onAgregar.
function TarjetaProducto({ producto, onAgregar }) {
    const { nombre, marca, modelo, precio, stock, imagen } = producto;
    const agotado = stock === 0;

    return (
        <div className="tarjeta-audiomax">
            <div className="contenedor-imagen">
                <img src={imagen} alt={nombre} className="imagen-producto" />
            </div>

            <div className="cuerpo-tarjeta">
                <h5 className="titulo-producto">{nombre}</h5>
                <p className="marca-producto">{marca} · {modelo}</p>
                <h6 className="precio-producto">${precio.toLocaleString('es-CL')}</h6>
                <p className={`stock-producto ${agotado ? 'stock-agotado' : ''}`}>
                    {agotado ? 'Agotado' : `Stock: ${stock}`}
                </p>
                <BotonAgregar
                    texto="Agregar al carrito"
                    onClick={onAgregar}
                    disabled={agotado}
                />
            </div>
        </div>
    );
}

export default TarjetaProducto;