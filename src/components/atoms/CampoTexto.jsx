
function CampoTexto(props) {
    const tipo = props.tipo || "text";
    const placeholder = props.placeholder || "";
    const className = props.className || "";
    const requerido = props.requerido || false;
    
    return(
        <input
            type={tipo}
            className={`form-control campotexto-audiomax ${className}`}
            placeholder={placeholder}
            value={props.valor}
            onChange={props.onChange}
            name={props.name}
            id={props.id}
            required={requerido}
            />
    )
}

export default CampoTexto;