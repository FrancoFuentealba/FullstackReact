import React from 'react';
import { Card } from 'react-bootstrap';
import { BotonAgregar } from '../atoms/BotonAgregar.jsx';

export const TarjetaProducto = ({ producto }) => {
    return(
        <Card className="tarjeta-audiomax h-100">
            <div className="contenedor-imagen ratio ratio-1x1 text-center">
                <Card.Img
                    variant="top"
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="imagen-producto"
                />
            </div>
            <Card.Body className="cuerpo-tarjeta d-flex flex-column">
                <Card.Title className="titulo-producto fw-bold">{producto.nombre}</Card.Title>
                <Card.Text className="marca-producto">{producto.marca} - {producto.modelo}</Card.Text>
                {/* El mt-auto empuja el precio y el botón hacia abajo para que todas las tarjetas queden alineadas */}
                <div className="mt-auto">
                    <Card.Text className="precio-producto fw-bold text-end">${producto.precio.toLocaleString('es-CL')}</Card.Text>
                    <BotonAgregar
                        texto={producto.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                        deshabilitado={producto.stock === 0}
                        onClick={() => console.log(`Agregando ${producto.nombre} al carrito`)}
                    />
                </div>
            </Card.Body>
        </Card>
    );
};