import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import Precio from '../components/atoms/Precio';
import EstadoPedido from '../components/molecules/EstadoPedido';
import { useAuth } from '../context/AuthContext';
import { obtenerToken } from '../services/authService';
import { obtenerPedidoDesdeAPI } from '../services/pedidoService';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Detalle de un pedido: GET /api/v1/pedidos/:id. La API decide quién puede verlo (dueño, vendedor o admin).
function PaginaDetallePedido() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { usuario, esPersonal } = useAuth();
    const [pedido, setPedido] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useTituloPagina(`Pedido ${id}`);

    useEffect(() => {
        let vigente = true;
        setCargando(true);
        setError(null);

        obtenerPedidoDesdeAPI(id, obtenerToken())
            .then((datos) => { if (vigente) setPedido(datos); })
            .catch((fallo) => { if (vigente) setError(fallo.message); })
            .finally(() => { if (vigente) setCargando(false); });

        return () => { vigente = false; };
    }, [id]);

    const volver = esPersonal ? '/admin/pedidos' : '/mis-pedidos';

    return (
        <PlantillaPublica>
            <Container className="mis-pedidos-contenedor">
                <h2 className="mis-pedidos-titulo">Pedido {id}</h2>

                {cargando && <p role="status">Cargando el pedido…</p>}

                {error && (
                    <>
                        <p className="mis-pedidos-aviso" role="alert">{error}</p>
                        <Boton texto="Volver" onClick={() => navigate(volver)} />
                    </>
                )}

                {pedido && (
                    <article className="pedido-tarjeta">
                        <header className="pedido-encabezado">
                            <strong className="pedido-numero">N° {pedido.id}</strong>
                            <span className="pedido-fecha">{new Date(pedido.fecha).toLocaleDateString('es-CL')}</span>
                        </header>

                        <div className="pedido-cuerpo">
                            <EstadoPedido estado={pedido.estado} />

                            <p><strong>Destinatario:</strong> {pedido.cliente.nombre}</p>
                            <p><strong>Dirección de entrega:</strong> {pedido.cliente.direccion}</p>
                            {esPersonal && usuario && <p><strong>Cuenta:</strong> {pedido.usuario}</p>}

                            <Table responsive striped bordered className="tabla-admin">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Código</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedido.lineas.map((linea) => (
                                        <tr key={linea.codigo}>
                                            <td>{linea.codigo}</td>
                                            <td>{linea.nombre}</td>
                                            <td>{linea.cantidad}</td>
                                            <td><Precio valor={linea.precio} /></td>
                                            <td><Precio valor={linea.subtotal} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <p className="pedido-total">
                                <span>Total</span>
                                <Precio valor={pedido.total} />
                            </p>

                            <Boton texto="Volver" variante="outline-secondary" onClick={() => navigate(volver)} />
                        </div>
                    </article>
                )}
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaDetallePedido;
