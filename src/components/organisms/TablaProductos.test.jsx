import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TablaProductos from './TablaProductos';

const productos = [
    { codigo: 'GTR-001', nombre: 'Guitarra Eléctrica', categoria: 'Guitarras', stock: 5, precio: 450000 },
    { codigo: 'MIC-001', nombre: 'Micrófono', categoria: 'Audio', stock: 0, precio: 16990 },
];

describe('TablaProductos', () => {
    it('muestra una fila por producto con código, nombre y precio', () => {
        render(<TablaProductos productos={productos} />);

        expect(screen.getByText('GTR-001')).toBeInTheDocument();
        expect(screen.getByText('Micrófono')).toBeInTheDocument();
        expect(screen.getByText('$450.000')).toBeInTheDocument();
    });

    it('avisa con el producto completo al hacer clic en Editar', async () => {
        const onEditar = vi.fn();
        render(<TablaProductos productos={productos} onEditar={onEditar} />);

        await userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[1]);

        expect(onEditar).toHaveBeenCalledWith(productos[1]);
    });

    it('avisa solo con el código al hacer clic en Eliminar', async () => {
        const onEliminar = vi.fn();
        render(<TablaProductos productos={productos} onEliminar={onEliminar} />);

        await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);

        expect(onEliminar).toHaveBeenCalledWith('GTR-001');
    });

    it('muestra un mensaje cuando no hay productos', () => {
        render(<TablaProductos productos={[]} />);

        expect(screen.getByText('No hay productos registrados.')).toBeInTheDocument();
    });
});
