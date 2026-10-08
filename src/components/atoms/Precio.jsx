
function Precio(props) {
    const valor = props.valor || 0;
    const moneda = props.moneda || "$";
    const variante = props.variante || "normal";
    const className = props.className || "";
    const valorFormateado = Number(valor).toLocaleString('es-CL');

    return (
        <span className={`precio-audiomax precio-${variante} ${className}`}>
            {moneda}{props.valor}
        </span>
    )
}

export default Precio;