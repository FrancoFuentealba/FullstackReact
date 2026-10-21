import { useState } from 'react';
import CampoTexto from '../atoms/CampoTexto';
import Boton from '../atoms/Boton';

function BarraBusqueda(props) {
    const [texto, setTexto] = useState('');
    const placeholder = props.placeholder || 'Buscar productos...';
    const className = props.className || '';

    function alCambiar(evento) {
        setTexto(evento.target.value);
    }

    function alEnviar(evento) {
        evento.preventDefault();               // evita que el formulario recargue la página
        const limpio = texto.trim();
        if (limpio !== '' && props.onBuscar) {
            props.onBuscar(limpio);
        }
    }

    return (
        <form className={`barra-busqueda ${className}`} onSubmit={alEnviar} role="search">
            <CampoTexto
                id="buscador"
                name="q"
                valor={texto}
                placeholder={placeholder}
                onChange={alCambiar}
            />
            <Boton texto="Buscar" tipo="submit" />
        </form>
    );
}

export default BarraBusqueda;