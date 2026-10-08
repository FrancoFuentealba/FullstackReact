
function Boton(props) {
    const tipo = props.tipo || "button";
    const variante = props.variante || "primary";
    const className = props.className || "";
    const deshabilitado = props.deshabilitado || false;

    return (
        <button
            type={tipo}
            className={`btn btn-${variante} ${className}`}
            onClick={props.onClick}
            disabled={deshabilitado}
        >
            {props.texto}
        </button>
    )
}

export default Boton;