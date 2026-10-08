
function Image(props) {
    const variante = props.variante || "fluid";
    const className = props.className || "";
    const alt = props.alt || "";

    return (
        <img src={props.src}
        alt={alt}
        className={`img-audiomax img-${variante} ${className}`} 
        />
    )
}

export default Image;