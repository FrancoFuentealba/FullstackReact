const ETAPAS = [
    { clave: 'preparacion', texto: 'En preparación' },
    { clave: 'despachado', texto: 'Despachado' },
    { clave: 'entregado', texto: 'Entregado' },
];

function EstadoPedido(props) {
    const actual = ETAPAS.findIndex((etapa) => etapa.clave === props.estado);

    return (
        <ol className="estado-pedido">
            {ETAPAS.map((etapa, indice) => {
                let clase = 'estado-pedido-etapa';
                if (indice < actual) clase += ' completada';
                if (indice === actual) clase += ' actual';

                return (
                    <li
                        key={etapa.clave}
                        className={clase}
                        aria-current={indice === actual ? 'step' : undefined}
                    >
                        <span className="estado-pedido-punto">{indice < actual ? '✓' : indice + 1}</span>
                        <span className="estado-pedido-texto">{etapa.texto}</span>
                    </li>
                );
            })}
        </ol>
    );
}

export default EstadoPedido;