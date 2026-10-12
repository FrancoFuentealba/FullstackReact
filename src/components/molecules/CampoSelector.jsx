import Selector from '../atoms/Selector';

function CampoSelector(props) {
    const hayError = Boolean(props.error);

    return (
        <div className="campo-formulario">
            <label htmlFor={props.id} className="form-label campo-formulario-etiqueta">
                {props.etiqueta}
            </label>

            <Selector
                id={props.id}
                name={props.name || props.id}
                opciones={props.opciones}
                valor={props.valor}
                onChange={props.onChange}
                deshabilitado={props.deshabilitado}
                invalido={hayError}
            />

            {hayError && (
                <p className="campo-formulario-error text-danger">{props.error}</p>
            )}
        </div>
    );
}

export default CampoSelector;