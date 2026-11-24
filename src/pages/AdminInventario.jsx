import { useState } from 'react';
import { Alert, Table } from 'react-bootstrap';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import Boton from '../components/atoms/Boton';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Inventario: admin y vendedor pueden ajustar SOLO el stock (PATCH /productos/:codigo/stock).
function PaginaAdminInventario() {
    useTituloPagina('Panel · Inventario');

    const { productos, actualizarStock } = useProductos();
    const [valores, setValores] = useState({});
    const [guardando, setGuardando] = useState(null);
    const [aviso, setAviso] = useState(null);

    async function guardar(producto) {
        const nuevo = valores[producto.codigo];
        if (nuevo === undefined || nuevo === '') return;

        setGuardando(producto.codigo);
        const resultado = await actualizarStock(producto.codigo, nuevo);
        setGuardando(null);

        if (!resultado.ok) {
            setAviso({ tipo: 'danger', texto: resultado.error });
            return;
        }

        setValores((actuales) => {
            const { [producto.codigo]: _quitado, ...resto } = actuales;
            return resto;
        });
        setAviso({ tipo: 'success', texto: `Stock de ${producto.codigo} actualizado a ${resultado.producto.stock}.` });
    }

    return (
        <PlantillaAdmin>
            <h2 className="admin-titulo-seccion">Inventario</h2>
            {aviso && <Alert variant={aviso.tipo}>{aviso.texto}</Alert>}

            <Table responsive striped bordered hover className="tabla-admin">
                <thead className="table-dark">
                    <tr>
                        <th>Cod</th>
                        <th>Nombre</th>
                        <th>Stock actual</th>
                        <th>Nuevo stock</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((p) => (
                        <tr key={p.codigo}>
                            <td>{p.codigo}</td>
                            <td>{p.nombre}</td>
                            <td>{p.stock}</td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    className="form-control form-control-sm"
                                    aria-label={`Nuevo stock de ${p.codigo}`}
                                    value={valores[p.codigo] ?? ''}
                                    onChange={(e) => setValores({ ...valores, [p.codigo]: e.target.value })}
                                />
                            </td>
                            <td>
                                <Boton
                                    texto={guardando === p.codigo ? 'Guardando…' : 'Guardar'}
                                    variante="warning"
                                    className="btn-sm"
                                    onClick={() => guardar(p)}
                                />
                            </td>
                        </tr>
                    ))}
                    {productos.length === 0 && (
                        <tr><td colSpan={5} className="text-center">No hay productos registrados.</td></tr>
                    )}
                </tbody>
            </Table>
        </PlantillaAdmin>
    );
}

export default PaginaAdminInventario;
