import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PaginaAdminProductos() {
    useTituloPagina('Admin · Productos');

    return (
        <PlantillaAdmin>
            <h2 className="admin-titulo-seccion">Productos</h2>
            <p className="admin-aviso">Aquí irá la tabla de productos (paso 7).</p>
        </PlantillaAdmin>
    );
}

export default PaginaAdminProductos;