import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import TablaProductos from '../components/organisms/TablaProductos';
import FormularioProducto from '../components/organisms/FormularioProducto';
import Boton from '../components/atoms/Boton';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaAdminProductos() {
    useTituloPagina('Admin · Productos');
    const { productos, crear, actualizar, eliminar } = useProductos();

    const [formularioAbierto, setFormularioAbierto] = useState(false);
    const [productoEditado, setProductoEditado] = useState(null);  
    const [productoPorEliminar, setProductoPorEliminar] = useState(null);
    const [aviso, setAviso] = useState(null);                        

    const categorias = [...new Set(productos.map((p) => p.categoria))];

    function abrirNuevo() {
        setProductoEditado(null);
        setProductoPorEliminar(null);
        setAviso(null);
        setFormularioAbierto(true);
    }

    function abrirEdicion(producto) {
        setProductoEditado(producto);
        setProductoPorEliminar(null);
        setAviso(null);
        setFormularioAbierto(true);
    }

    function cerrarFormulario() {
        setFormularioAbierto(false);
        setProductoEditado(null);
    }

    function guardar(datos) {
        if (productoEditado) {
            const actualizado = actualizar(productoEditado.codigo, datos);
            setAviso(actualizado
                ? { tipo: 'success', texto: `Producto ${actualizado.codigo} actualizado.` }
                : { tipo: 'danger', texto: 'El producto ya no existe.' });
            cerrarFormulario();
            return;
        }

        const resultado = crear(datos);
        if (!resultado.ok) {
            
            setAviso({ tipo: 'danger', texto: resultado.error });
            return;
        }
        setAviso({ tipo: 'success', texto: `Producto ${resultado.producto.codigo} creado.` });
        cerrarFormulario();
    }

    function pedirConfirmacion(codigo) {
        setProductoPorEliminar(productos.find((p) => p.codigo === codigo) ?? null);
        setAviso(null);
    }

    function confirmarEliminacion() {
        eliminar(productoPorEliminar.codigo);
        setAviso({ tipo: 'success', texto: `Producto ${productoPorEliminar.codigo} eliminado.` });
        setProductoPorEliminar(null);
    }

    return (
        <PlantillaAdmin>
            <div className="admin-encabezado-seccion">
                <h2 className="admin-titulo-seccion">Productos</h2>
                {!formularioAbierto && <Boton texto="Nuevo producto" onClick={abrirNuevo} />}
            </div>

            {aviso && <Alert variant={aviso.tipo}>{aviso.texto}</Alert>}

            {productoPorEliminar && (
                <Alert variant="warning" className="admin-confirmacion">
                    <span>¿Eliminar "{productoPorEliminar.nombre}"? Esta acción no se puede deshacer.</span>
                    <span className="admin-confirmacion-botones">
                        <Boton texto="Sí, eliminar" variante="danger" className="btn-sm me-2" onClick={confirmarEliminacion} />
                        <Boton texto="Cancelar" variante="secondary" className="btn-sm" onClick={() => setProductoPorEliminar(null)} />
                    </span>
                </Alert>
            )}

            {formularioAbierto && (
                <FormularioProducto
                    productoInicial={productoEditado}
                    categorias={categorias}
                    onGuardar={guardar}
                    onCancelar={cerrarFormulario}
                />
            )}

            <TablaProductos
                productos={productos}
                onEditar={abrirEdicion}
                onEliminar={pedirConfirmacion}
            />
        </PlantillaAdmin>
    );
}

export default PaginaAdminProductos;
