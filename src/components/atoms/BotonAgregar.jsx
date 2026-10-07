
function BotonAgregar({ texto, onClick, disabled = false }) {
    return (
        <button
            className="boton-agregar"
            onClick={onClick}
            disabled={disabled}
        >
            {texto}
        </button>
    );
}

export default BotonAgregar;
