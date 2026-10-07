
function Badge(props) {
    const variante = props.variante || "primario";
    const className = props.className || "";
    
    return (
        <span className={`badge-audiomax badge-${variante} ${className}`}>
            {props.texto}
        </span>
    )
}
export default Badge;