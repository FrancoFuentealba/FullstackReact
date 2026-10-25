import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProductosProvider } from '../context/ProductosContext';
import PaginaAdminProductos from './AdminProductos';
import { obtenerProducto } from '../services/productoService';

// Prueba de integración de la página: AuthContext + ProductosContext + service + localStorage reales.
// La página va DENTRO de <Routes>, igual que en App.jsx: así, cuando PlantillaAdmin redirige a /login,
// la ruta cambia y la página se desmonta. (Sin <Routes>, el <Navigate> se repetiría sin fin.)
function mostrarPagina() {
    return render(
        <MemoryRouter initialEntries={['/admin/productos']}>
            <AuthProvider>
                <ProductosProvider>
                    <Routes>
                        <Route path="/admin/productos" element={<PaginaAdminProductos />} />
                        <Route path="/login" element={<p>Pantalla de login</p>} />
                    </Routes>
                </ProductosProvider>
            </AuthProvider>
        </MemoryRouter>
    );
}

const entrarComo = (rol) =>
    localStorage.setItem('sesion', JSON.stringify({ nombre: 'Usuario', email: 'usuario@correo.cl', rol }));

describe('PaginaAdminProductos', () => {
    beforeEach(() => {
        localStorage.clear();
        entrarComo('admin');
    });

    it('muestra el panel y la tabla con los productos del catálogo', () => {
        mostrarPagina();

        expect(screen.getByText('Panel de administración')).toBeInTheDocument();
        expect(screen.getByText('GTR-001')).toBeInTheDocument();
    });

    it('manda a un cliente al login en vez de mostrarle el panel', () => {
        entrarComo('cliente');

        mostrarPagina();

        expect(screen.getByText('Pantalla de login')).toBeInTheDocument();
        expect(screen.queryByText('Panel de administración')).not.toBeInTheDocument();
    });

    it('crea un producto nuevo y lo deja en el catálogo', async () => {
        mostrarPagina();

        await userEvent.click(screen.getByRole('button', { name: 'Nuevo producto' }));
        await userEvent.type(screen.getByLabelText('Código'), 'TST-001');
        await userEvent.type(screen.getByLabelText('Nombre'), 'Producto de prueba');
        await userEvent.type(screen.getByLabelText('Marca'), 'Marca X');
        await userEvent.type(screen.getByLabelText('Modelo'), 'Modelo Y');
        await userEvent.selectOptions(screen.getByLabelText('Categoría'), 'Audio');
        await userEvent.type(screen.getByLabelText('Precio'), '15000');
        await userEvent.type(screen.getByLabelText('Stock'), '3');
        await userEvent.click(screen.getByRole('button', { name: 'Guardar Producto' }));

        expect(screen.getByText('Producto TST-001 creado.')).toBeInTheDocument();
        expect(obtenerProducto('TST-001').stock).toBe(3);
    });

    it('muestra el error cuando el código ya existe y no crea nada', async () => {
        mostrarPagina();

        await userEvent.click(screen.getByRole('button', { name: 'Nuevo producto' }));
        await userEvent.type(screen.getByLabelText('Código'), 'GTR-001');
        await userEvent.type(screen.getByLabelText('Nombre'), 'Repetido');
        await userEvent.type(screen.getByLabelText('Marca'), 'Marca X');
        await userEvent.type(screen.getByLabelText('Modelo'), 'Modelo Y');
        await userEvent.selectOptions(screen.getByLabelText('Categoría'), 'Audio');
        await userEvent.type(screen.getByLabelText('Precio'), '15000');
        await userEvent.type(screen.getByLabelText('Stock'), '3');
        await userEvent.click(screen.getByRole('button', { name: 'Guardar Producto' }));

        expect(screen.getByText('Ya existe un producto con el código GTR-001')).toBeInTheDocument();
        expect(obtenerProducto('GTR-001').nombre).not.toBe('Repetido');
    });

    it('edita el stock de un producto existente', async () => {
        mostrarPagina();

        await userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0]); // GTR-001
        await userEvent.clear(screen.getByLabelText('Stock'));
        await userEvent.type(screen.getByLabelText('Stock'), '9');
        await userEvent.click(screen.getByRole('button', { name: 'Guardar Producto' }));

        expect(screen.getByText('Producto GTR-001 actualizado.')).toBeInTheDocument();
        expect(obtenerProducto('GTR-001').stock).toBe(9);
    });

    it('pide confirmación antes de eliminar y solo elimina si se confirma', async () => {
        mostrarPagina();

        await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);
        await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
        expect(obtenerProducto('GTR-001')).not.toBeNull(); // cancelar no borra nada

        await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);
        await userEvent.click(screen.getByRole('button', { name: 'Sí, eliminar' }));

        expect(obtenerProducto('GTR-001')).toBeNull();
        expect(screen.getByText('Producto GTR-001 eliminado.')).toBeInTheDocument();
    });
});
