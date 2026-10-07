
function Typography(props) {
    const Etiqueta = props.etiqueta || "p";
    const color = props.color || "negro";
    const className = props.className || "";

    return (
        <Etiqueta className={`texto-audiomax texto-${color} ${className}`}>
            {props.children}
        </Etiqueta>
    )
}

export default Typography;