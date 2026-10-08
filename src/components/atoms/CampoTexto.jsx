
function CampoTexto(props) {
    const tipo = props.tipo || "text";
    const placeholder = props.placeholder || "";
    const className = props.className || "";
    const requerido = props.requerido || false;
    
    return(
        <input
            type={props.tipo || "text"}
            className={`campotexto-audiomax ${props.className || ""}`}
            placeholder={props.placeholder || ""}
            value={props.valor}
            onChange={props.onChange}
            name={props.name}
            id={props.id}
            required={props.requerido || false}
            />
    )
}

export default CampoTexto;