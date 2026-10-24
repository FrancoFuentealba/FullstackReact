import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import TablaPedidos from '../components/organisms/TablaPedidos';
import { usePedidos } from '../context/PedidosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { ETIQUETAS_ESTADO } from '../utils/pedidos';

function PaginaAdminPedidos() {
    useTituloPagina('Admin · Pedidos');
    const { pedidos, cambiarEstado } = usePedidos();
    const [aviso, setAviso] = useState(null);

    const ordenados = [...pedidos].sort((a, b) => b.fecha.localeCompare(a.fecha));

    function alCambiarEstado(id, estado) {
        const pedido = cambiarEstado(id, estado);
        setAviso(pedido
            ? { tipo: 'success', texto: `El pedido ${id} ahora está "${ETIQUETAS_ESTADO[estado]}".` }
            : { tipo: 'danger', texto: `El pedido ${id} no existe.` });
    }

    return (
        <PlantillaAdmin>
            <h2 className="admin-titulo-seccion">Pedidos</h2>

            {aviso && <Alert variant={aviso.tipo}>{aviso.texto}</Alert>}

            <TablaPedidos pedidos={ordenados} onCambiarEstado={alCambiarEstado} />
        </PlantillaAdmin>
    );
}

export default PaginaAdminPedidos;