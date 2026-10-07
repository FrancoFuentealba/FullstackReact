
function Input(props) {
    const tipo = props.tipo || "text";
    const className = props.className || "";
    const placeholder = props.placeholder || "";
    const requerido = props.requerido || false;

    return (
        <input
            type={tipo}
            className={`input-audiomax ${className}`}
            placeholder={placeholder}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            id={props.id}
            required={requerido}
            />
    )
}

export default Input;