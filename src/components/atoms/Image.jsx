
function Image(props) {
    const variante = props.variante || "fluida";
    const className = props.className || "";

    return (
        <img src={props.src}
        alt={props.alt}
        className={`img-audiomax img-${variante} ${className}`} 
        />
    )
}

export default Image;