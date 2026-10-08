
function EtiquetaStock(props) {
    const estado = props.estado || "disponible";
    const className = props.className || "";

    return (
        <span className={`etiqueta-audiomax stock-${estado} ${className}`}>
            {props.texto}
        </span>
    )
}

 export default EtiquetaStock;