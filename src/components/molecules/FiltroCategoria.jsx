import Selector from '../atoms/Selector';

function FiltroCategoria(props) {
    const categorias = props.categorias || [];
    const id = props.id || "filtro-categoria";

    const opciones = [
        { valor: 'todas', texto: 'Todas las categorías' },
        ...categorias.map((categoria) => ({ valor: categoria, texto: categoria })),
    ];

    function alCambiarSeleccion(evento) {
        if (props.onCambiar) {
            props.onCambiar(evento.target.value);
        }
    }

    return (
        <div className="filtro-categoria">
            <label htmlFor={id} className="form-label filtro-categoria-etiqueta">
                Categoría
            </label>
            <Selector
                id={id}
                name="categoria"
                opciones={opciones}
                valor={props.valor || 'todas'}
                onChange={alCambiarSeleccion}
            />
        </div>
    );
}

export default FiltroCategoria;