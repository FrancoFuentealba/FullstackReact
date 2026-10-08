
function EtiquetaStock(props) {
    const estado = props.estado || "disponible";
    const className = props.className || "";
    const colores = { 
        disponible: "bg-success",
        bajo: "bg-warning",
        agotado: "bg-danger"
    };
    const colorFondo = colores[estado] || "bg-secondary";

    return (
        <span className={`badge ${colorFondo} etiqueta-audiomax stock-${estado} ${className}`}>
            {props.texto}
        </span>
    )
}

 export default EtiquetaStock;