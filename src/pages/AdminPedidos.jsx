import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import TablaPedidos from '../components/organisms/TablaPedidos';
import { usePedidos } from '../context/PedidosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { ETIQUETAS_ESTADO } from '../utils/pedidos';

function PaginaAdminPedidos() {
    useTituloPagina('Admin · Pedidos');

    const {
        pedidos,
        cambiarEstado,
        cargandoMisPedidos,
        errorMisPedidos,
    } = usePedidos();

    const [aviso, setAviso] = useState(null);
    const ordenados = [...pedidos].sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
    );

    async function alCambiarEstado(id, estado) {
        const resultado = await cambiarEstado(id, estado);

        setAviso(resultado.ok
            ? {
                tipo: 'success',
                texto: `El pedido ${id} ahora está "${ETIQUETAS_ESTADO[estado]}".`,
            }
            : {
                tipo: 'danger',
                texto: resultado.error || `No se pudo actualizar el pedido ${id}.`,
            });
    }

    return (
        <PlantillaAdmin>
            <h2 className="admin-titulo-seccion">Pedidos</h2>

            {aviso && <Alert variant={aviso.tipo}>{aviso.texto}</Alert>}
            {errorMisPedidos && <Alert variant="danger">{errorMisPedidos}</Alert>}
            {cargandoMisPedidos
                ? <p role="status">Cargando pedidos…</p>
                : <TablaPedidos pedidos={ordenados} onCambiarEstado={alCambiarEstado} />}
        </PlantillaAdmin>
    );
}

export default PaginaAdminPedidos;
