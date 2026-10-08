import Selector from '../atoms/Selector.jsx';

function FiltroCategoria(props) {
    const categorias = props.categorias || [];

    const opciones = [
        { valor: 'todas', texto: 'Todas las categorías' },
        ...categorias.map((categoria) => ({ valor: categoria, texto: categoria })),
    ];

    function alCambiarSeleccion(evento) {
        if (props.alCambiar) {
            props.alCambiar(evento.target.value);
        }
    }

    return (
        <div className="filtro-categoria">
            <label htmlFor="filtro-categoria" className="filtro-categoria-etiqueta">
                Categoría
            </label>
            <Selector
                id="filtro-categoria"
                name="categoria"
                opciones={opciones}
                valor={props.valor || 'todas'}
                onChange={alCambiarSeleccion}
            />
        </div>
    );
}

export default FiltroCategoria;