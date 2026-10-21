function EtiquetaOferta(props) {
    const className = props.className || "";

    return (
        <span className={`etiqueta-oferta ${className}`}>
            {props.texto}
        </span>
    )
}

export default EtiquetaOferta;