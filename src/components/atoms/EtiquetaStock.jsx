
function EtiquetaStock(props) {
    const estado = props.estado || "disponible";
    const className = props.className || "";
    const colorFondo = estado === "disponible" ? "bg-success" :  "bg-danger";

    return (
        <span className={`badge ${colorFondo}etiqueta-audiomax stock-${estado} ${className}`}>
            {props.texto}
        </span>
    )
}

 export default EtiquetaStock;