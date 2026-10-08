import CampoTexto from '../atoms/CampoTexto.jsx';

function CampoFormulario(props) {
    const hayError = Boolean(props.error);

    return (
        <div className="campo-formulario">
            <label htmlFor={props.id} className="campo-formulario-etiqueta">
                {props.etiqueta}
            </label>

            <CampoTexto
                id={props.id}
                name={props.name || props.id}
                tipo={props.tipo}
                valor={props.valor}
                onChange={props.onChange}
                placeholder={props.placeholder}
                requerido={props.requerido}
                className={hayError ? 'is-invalid' : ''}
            />

            {hayError && <p className="campo-formulario-error">{props.error}</p>}
        </div>
    );
}

export default CampoFormulario;