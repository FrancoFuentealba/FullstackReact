import React from 'react';
import { Card, card } from 'react-bootstrap';
import { BotonAgregar } from '../atoms/BotonAgregar.jsx';

export const TarjetaProducto = ({ producto }) => {
<<<<<<< HEAD
    <Card className="h-100">
=======
    return(
        <Card className="h-100">
>>>>>>> d1100eb703d0a399d03a2a05c6b65a8716013eab
        <div className="ratio ratio-1x1">
            <Card.Img
                variant="top"
                src={producto.imagen}
                alt={producto.nombre}
            />
        </div>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="fw-bold">{producto.nombre}</Card.Title>
            <Card.Text className="text-muted">{producto.marca} - {producto.modelo}</Card.Text>
            {/* El mt-auto empuja el precio y el botón hacia abajo para que todas las tarjetas queden alineadas */}
            <div className="mt-auto">
                <Card.Text className="fw-bold text-end">${producto.precio.toLocaleString('es-CL')}</Card.Text>
                <BotonAgregar
                texto= {producto.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                deshabilitado= {producto.stock === 0}
                onClick = {() => console.log(`Agregando ${producto.nombre} al carrito`)}
                />
            </div>
        </Card.Body>
    </Card>
<<<<<<< HEAD
=======
    )
>>>>>>> d1100eb703d0a399d03a2a05c6b65a8716013eab
}