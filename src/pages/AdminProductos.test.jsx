import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PaginaAdminProductos from './AdminProductos';

const mocks = vi.hoisted(() => ({
    productos: [],
    useAuth: vi.fn(),
    crear: vi.fn(),
    actualizar: vi.fn(),
    eliminar: vi.fn(),
}));

vi.mock('../context/AuthContext', () => ({
    useAuth: mocks.useAuth,
}));

vi.mock('../context/ProductosContext', () => ({
    useProductos: () => ({
        productos: mocks.productos,
        crear: mocks.crear,
        actualizar: mocks.actualizar,
        eliminar: mocks.eliminar,
    }),
}));

function mostrarPagina() {
    return render(
        <MemoryRouter initialEntries={['/admin/productos']}>
            <Routes>
                <Route path="/admin/productos" element={<PaginaAdminProductos />} />
                <Route path="/login" element={<p>Pantalla de login</p>} />
            </Routes>
        </MemoryRouter>,
    );
}

const productoBase = {
    codigo: 'GTR-001',
    categoria: 'Guitarras',
    nombre: 'Guitarra de prueba',
    marca: 'Fender',
    modelo: 'Player',
    stock: 5,
    precio: 450000,
    descuento: 15,
    imagen: '/img/guitarra.jpg',
};

describe('PaginaAdminProductos conectada al contexto API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mocks.useAuth.mockReturnValue({
            usuario: { nombre: 'Admin', email: 'admin@example.com', rol: 'admin' },
            esAdmin: true,
            cerrar: vi.fn(),
        });
        mocks.productos = [{ ...productoBase }];
        mocks.crear.mockResolvedValue({
            ok: true,
            producto: { ...productoBase, codigo: 'TST-001' },
        });
        mocks.actualizar.mockResolvedValue({
            ok: true,
            producto: { ...productoBase, stock: 9 },
        });
        mocks.eliminar.mockResolvedValue({ ok: true });
    });

    it('muestra el panel y los productos recibidos del contexto', () => {
        mostrarPagina();

        expect(screen.getByText('Panel de administración')).toBeInTheDocument();
        expect(screen.getByText('GTR-001')).toBeInTheDocument();
    });

    it('manda a un cliente al login en vez de mostrarle el panel', async () => {
        mocks.useAuth.mockReturnValue({
            usuario: { nombre: 'Cliente', email: 'cliente@example.com', rol: 'cliente' },
            esAdmin: false,
            cerrar: vi.fn(),
        });

        mostrarPagina();

        expect(await screen.findByText('Pantalla de login')).toBeInTheDocument();
        expect(screen.queryByText('Panel de administración')).not.toBeInTheDocument();
    });

    it('envía un producto nuevo al contexto y muestra confirmación', async () => {
        mostrarPagina();

        await userEvent.click(screen.getByRole('button', { name: 'Nuevo producto' }));
        await userEvent.type(screen.getByLabelText('Código'), 'TST-001');
        await userEvent.type(screen.getByLabelText('Nombre'), 'Producto de prueba');
        await userEvent.type(screen.getByLabelText('Marca'), 'Marca X');
        await userEvent.type(screen.getByLabelText('Modelo'), 'Modelo Y');
        await userEvent.selectOptions(screen.getByLabelText('Categoría'), 'Guitarras');
        await userEvent.type(screen.getByLabelText('Precio'), '15000');
        await userEvent.type(screen.getByLabelText('Stock'), '3');
        await userEvent.click(screen.getByRole('button', { name: 'Guardar Producto' }));

        await waitFor(() => {
            expect(mocks.crear).toHaveBeenCalledWith(expect.objectContaining({
                codigo: 'TST-001',
                nombre: 'Producto de prueba',
                precio: 15000,
                stock: 3,
            }));
        });
        expect(await screen.findByText('Producto TST-001 creado.')).toBeInTheDocument();
    });

    it('muestra el error de duplicado que devuelve la API', async () => {
        mocks.crear.mockResolvedValue({
            ok: false,
            error: 'Ya existe el producto GTR-001',
        });

        mostrarPagina();

        await userEvent.click(screen.getByRole('button', { name: 'Nuevo producto' }));
        await userEvent.type(screen.getByLabelText('Código'), 'GTR-001');
        await userEvent.type(screen.getByLabelText('Nombre'), 'Repetido');
        await userEvent.type(screen.getByLabelText('Marca'), 'Marca X');
        await userEvent.type(screen.getByLabelText('Modelo'), 'Modelo Y');
        await userEvent.selectOptions(screen.getByLabelText('Categoría'), 'Guitarras');
        await userEvent.type(screen.getByLabelText('Precio'), '15000');
        await userEvent.type(screen.getByLabelText('Stock'), '3');
        await userEvent.click(screen.getByRole('button', { name: 'Guardar Producto' }));

        expect(await screen.findByText('Ya existe el producto GTR-001')).toBeInTheDocument();
    });

    it('envía cambios de un producto existente al contexto', async () => {
        mostrarPagina();

        await userEvent.click(screen.getByRole('button', { name: 'Editar' }));
        await userEvent.clear(screen.getByLabelText('Stock'));
        await userEvent.type(screen.getByLabelText('Stock'), '9');
        await userEvent.click(screen.getByRole('button', { name: 'Guardar Producto' }));

        await waitFor(() => {
            expect(mocks.actualizar).toHaveBeenCalledWith(
                'GTR-001',
                expect.objectContaining({ stock: 9 }),
            );
        });
        expect(await screen.findByText('Producto GTR-001 actualizado.')).toBeInTheDocument();
    });

    it('pide confirmación antes de retirar el producto', async () => {
        mostrarPagina();

        await userEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
        await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
        expect(mocks.eliminar).not.toHaveBeenCalled();

        await userEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
        await userEvent.click(screen.getByRole('button', { name: 'Sí, eliminar' }));

        await waitFor(() => {
            expect(mocks.eliminar).toHaveBeenCalledWith('GTR-001');
        });
        expect(await screen.findByText('Producto GTR-001 retirado del catálogo.')).toBeInTheDocument();
    });
});
