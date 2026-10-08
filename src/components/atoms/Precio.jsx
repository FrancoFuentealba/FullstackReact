
function Precio(props) {
    const valor = props.valor || "0";
    const moneda = props.moneda || "$";
    const variante = props.variante || "normal";
    const className = props.className || "";

    return (
        <span className={`precio-audiomax precio-${variante} ${className}`}>
            {moneda}{props.valor}
        </span>
    )
}

export default Precio;