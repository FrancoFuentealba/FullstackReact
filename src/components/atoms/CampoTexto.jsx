
function CampoTexto(props) {
    const tipo = props.tipo || "text";
    const placeholder = props.placeholder || "";
    const className = props.className || "";
    const requerido = props.requerido || false;
    const invalido = props.invalido || false;
    const valor = props.valor ?? "";
    
    return(
        <input
            type={tipo}
            className={`form-control campotexto-audiomax ${invalido ? 'is-invalid' : ''} ${className}`}
            placeholder={placeholder}
            value={valor}
            onChange={props.onChange}
            name={props.name}
            id={props.id}
            required={requerido}
            />
    )
}

export default CampoTexto;