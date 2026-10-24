import { Table } from 'react-bootstrap';
import Precio from '../atoms/Precio';
import Selector from '../atoms/Selector';
import { ESTADOS_PEDIDO, ETIQUETAS_ESTADO } from '../../utils/pedidos';

const OPCIONES_ESTADO = ESTADOS_PEDIDO.map((estado) => ({ valor: estado, texto: ETIQUETAS_ESTADO[estado] }));

// Tabla de pedidos para el administrador
function TablaPedidos(props) {
    const pedidos = props.pedidos || [];

    function alCambiar(id, evento) {
        if (props.onCambiarEstado) props.onCambiarEstado(id, evento.target.value);
    }

    return (
        <Table responsive striped bordered hover className="tabla-admin">
            <thead className="table-dark">
                <tr>
                    <th>N°</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>{new Date(pedido.fecha).toLocaleDateString('es-CL')}</td>
                        <td>
                            {pedido.cliente.nombre}
                            <br />
                            <small className="text-muted">{pedido.usuario ?? 'sin cuenta'}</small>
                        </td>
                        <td>
                            <ul className="tabla-pedidos-lineas">
                                {pedido.lineas.map((linea) => (
                                    <li key={linea.codigo}>{linea.nombre} × {linea.cantidad}</li>
                                ))}
                            </ul>
                        </td>
                        <td><Precio valor={pedido.total} /></td>
                        <td>
                            <label htmlFor={`estado-${pedido.id}`} className="visually-hidden">
                                Estado del pedido {pedido.id}
                            </label>
                            <Selector
                                id={`estado-${pedido.id}`}
                                opciones={OPCIONES_ESTADO}
                                valor={pedido.estado}
                                onChange={(evento) => alCambiar(pedido.id, evento)}
                            />
                        </td>
                    </tr>
                ))}
                {pedidos.length === 0 && (
                    <tr>
                        <td colSpan={6} className="text-center">Aún no hay pedidos.</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default TablaPedidos;