
function ContadorFinal(props) {
    const valor = props.valor || 0;
    const className = props.className || "";

    return (
        <div className={`input-group contador-audiomax ${className}`}>
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={props.alRestar}
            >
                -
            </button>

            <input
                type="text"
                className="form-control text-center"
                value={valor}
                readOnly
            />

            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={props.alSumar}
            >
                +
            </button>
        </div>
    )
}

export default ContadorFinal;