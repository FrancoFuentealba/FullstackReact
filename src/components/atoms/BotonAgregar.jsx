import React from 'react';
import { Button } from 'react-bootstrap';

export const BotonAgregar = ({ texto, deshabilitado, onClick}) => {
    return (
        <Button
            className = "w-100 fw-bold btn-audiomax"
            disabled = {deshabilitado}
            onClick = {onClick}
        >
            {texto}
        </Button>
    )
}