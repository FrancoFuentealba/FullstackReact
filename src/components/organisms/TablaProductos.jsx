import { Table } from 'react-bootstrap';
import Precio from '../atoms/Precio';
import Boton from '../atoms/Boton';
import { precioFinal } from "../../utils/ofertas";

function TablaProductos(props) {
    const productos = props.productos || [];

    function alEditar(producto) {
        if (props.onEditar) props.onEditar(producto);
    }

    function alEliminar(producto) {
        if (props.onEliminar) props.onEliminar(producto.codigo);
    }

    return (
        <Table responsive striped bordered hover className="tabla-admin">
            <thead className="table-dark">
                <tr>
                    <th>Cod</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((p) => (
                    <tr key={p.codigo}>
                        <td>{p.codigo}</td>
                        <td>{p.nombre}</td>
                        <td>{p.categoria}</td>
                        <td>{p.stock}</td>
                        <td><Precio valor={precioFinal(p)} /></td>
                        <td>
                            <Boton texto="Editar" variante="warning" className="me-2 btn-sm" onClick={() => alEditar(p)} />
                            <Boton texto="Eliminar" variante="danger" className="btn-sm" onClick={() => alEliminar(p)} />
                        </td>
                    </tr>
                ))}
                {productos.length === 0 && (
                    <tr>
                        <td colSpan={6} className="text-center">No hay productos registrados.</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default TablaProductos;