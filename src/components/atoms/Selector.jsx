function Selector(props) {
    const opciones = props.opciones || [];
    const className = props.className || "";
    const deshabilitado = props.deshabilitado || false;
    const valor = props.valor ?? "";

    return (
        <select 
            className={`form-select selector-audiomax ${className}`}
            value={valor}
            onChange={props.onChange}
            name={props.name}
            id={props.id}
            disabled={deshabilitado}
        >
        
            {opciones.map((opcion, index) => (
                <option key={index} value={opcion.valor}>
                    {opcion.texto}
                </option>
            ))}
        </select>
    )
}

export default Selector;