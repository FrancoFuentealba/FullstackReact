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
    const [guardando, setGuardando] = useState(false);

    const categorias = [...new Set(productos.map((producto) => producto.categoria))];

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

    async function guardar(datos) {
        setGuardando(true);

        const resultado = productoEditado
            ? await actualizar(productoEditado.codigo, datos)
            : await crear(datos);

        setGuardando(false);

        if (!resultado.ok) {
            setAviso({ tipo: 'danger', texto: resultado.error });
            return;
        }

        setAviso({
            tipo: 'success',
            texto: `Producto ${resultado.producto.codigo} ${
                productoEditado ? 'actualizado' : 'creado'
            }.`,
        });

        cerrarFormulario();
    }

    function pedirConfirmacion(codigo) {
        setProductoPorEliminar(
            productos.find((producto) => producto.codigo === codigo) ?? null,
        );
        setAviso(null);
    }

    async function confirmarEliminacion() {
        setGuardando(true);

        const codigo = productoPorEliminar.codigo;
        const resultado = await eliminar(codigo);

        setGuardando(false);

        if (!resultado.ok) {
            setAviso({ tipo: 'danger', texto: resultado.error });
            setProductoPorEliminar(null);
            return;
        }

        setAviso({
            tipo: 'success',
            texto: `Producto ${codigo} retirado del catálogo.`,
        });
        setProductoPorEliminar(null);
    }

    return (
        <PlantillaAdmin>
            <div className="admin-encabezado-seccion">
                <h2 className="admin-titulo-seccion">Productos</h2>
                {!formularioAbierto && (
                    <Boton texto="Nuevo producto" onClick={abrirNuevo} />
                )}
            </div>

            {aviso && <Alert variant={aviso.tipo}>{aviso.texto}</Alert>}

            {productoPorEliminar && (
                <Alert variant="warning" className="admin-confirmacion">
                    <span>¿Retirar "{productoPorEliminar.nombre}" del catálogo?</span>
                    <span className="admin-confirmacion-botones">
                        <Boton
                            texto="Sí, eliminar"
                            variante="danger"
                            className="btn-sm me-2"
                            onClick={confirmarEliminacion}
                            disabled={guardando}
                        />
                        <Boton
                            texto="Cancelar"
                            variante="secondary"
                            className="btn-sm"
                            onClick={() => setProductoPorEliminar(null)}
                            disabled={guardando}
                        />
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
