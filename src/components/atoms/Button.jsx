
function Button(props) {
    const tipo = props.tipo || "button";
    const variante = props.variante || "primario";
    const className = props.className || "";
    const deshabilitado = props.deshabilitado || false;

    return (
        <button
            type={tipo}
            className={`btn-audiomax btn-${variante} ${className}`}
            onClick={props.onClick}
            disabled={deshabilitado}
        >
            {props.texto}
        </button>
    )
}

export default Button;