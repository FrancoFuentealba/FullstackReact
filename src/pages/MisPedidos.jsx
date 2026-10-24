import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import Precio from '../components/atoms/Precio';
import EstadoPedido from '../components/molecules/EstadoPedido';
import { useAuth } from '../context/AuthContext';
import { usePedidos } from '../context/PedidosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaMisPedidos() {
    useTituloPagina('Mis pedidos');
    const navigate = useNavigate();
    const { usuario } = useAuth();
    const { misPedidos } = usePedidos();

    // Guardia 1: hay que iniciar sesión
    if (!usuario) {
        return (
            <PlantillaPublica>
                <Container className="mis-pedidos-contenedor">
                    <h2 className="mis-pedidos-titulo">Inicia sesión para ver tus pedidos</h2>
                    <p className="mis-pedidos-aviso">Necesitas una cuenta para consultar tus compras.</p>
                    <Boton texto="Iniciar sesión" onClick={() => navigate('/login')} />
                </Container>
            </PlantillaPublica>
        );
    }

    // Guardia 2: todavía no ha comprado nada
    if (misPedidos.length === 0) {
        return (
            <PlantillaPublica>
                <Container className="mis-pedidos-contenedor">
                    <h2 className="mis-pedidos-titulo">Aún no tienes pedidos</h2>
                    <p className="mis-pedidos-aviso">Cuando compres algo, lo verás aquí.</p>
                    <Boton texto="Ir al catálogo" onClick={() => navigate('/catalogo')} />
                </Container>
            </PlantillaPublica>
        );
    }

    // Del más reciente al más antiguo (copia con [...] para no modificar el contexto)
    const ordenados = [...misPedidos].sort((a, b) => b.fecha.localeCompare(a.fecha));

    return (
        <PlantillaPublica>
            <Container className="mis-pedidos-contenedor">
                <h2 className="mis-pedidos-titulo">Mis pedidos</h2>

                {ordenados.map((pedido) => (
                    <article key={pedido.id} className="pedido-tarjeta">
                        <header className="pedido-encabezado">
                            <strong className="pedido-numero">{pedido.id}</strong>
                            <span className="pedido-fecha">
                                {new Date(pedido.fecha).toLocaleDateString('es-CL')}
                            </span>
                        </header>

                        <div className="pedido-cuerpo">
                            <EstadoPedido estado={pedido.estado} />

                            <ul className="pedido-lineas">
                                {pedido.lineas.map((linea) => (
                                    <li key={linea.codigo} className="pedido-linea">
                                        <span className="pedido-linea-detalle">
                                            {linea.nombre} × {linea.cantidad}
                                        </span>
                                        <Precio valor={linea.subtotal} />
                                    </li>
                                ))}
                            </ul>

                            <p className="pedido-total">
                                <span>Total</span>
                                <Precio valor={pedido.total} />
                            </p>
                        </div>
                    </article>
                ))}
            </Container>
        </PlantillaPublica>
    );
}

export default PaginaMisPedidos;