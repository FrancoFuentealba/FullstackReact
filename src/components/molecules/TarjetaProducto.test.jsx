import { describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import TarjetaProducto from './TarjetaProducto';

const producto = {
    codigo: 'GTR-001',
    nombre: 'Guitarra Eléctrica Stratocaster',
    marca: 'Fender',
    modelo: 'Player Strat',
    stock: 5,
    precio: 450000,
    imagen: '/img/guitarra.jpg',
};

describe('TarjetaProducto', () => {
    it('muestra el nombre, la marca y el modelo, y el precio formateado', () => {
        render(<TarjetaProducto producto={producto} onAgregar={() => {}} />);

        expect(screen.getByText('Guitarra Eléctrica Stratocaster')).toBeInTheDocument();
        expect(screen.getByText('Fender · Player Strat')).toBeInTheDocument();
        expect(screen.getByText('$450.000')).toBeInTheDocument();
    });

    it('avisa al padre con el producto al hacer clic en "Agregar al carrito"', async () => {
        const onAgregar = vi.fn(); // mock: función falsa que registra sus llamadas
        render(<TarjetaProducto producto={producto} onAgregar={onAgregar} />);

        await userEvent.click(screen.getByRole('button', { name: /agregar al carrito/i }));

        expect(onAgregar).toHaveBeenCalledTimes(1);
        expect(onAgregar).toHaveBeenCalledWith(producto);
    });


    it('muestra la etiqueta "Agotado" y deshabilita el botón cuando no hay stock', () => {
        render(<TarjetaProducto producto={{ ...producto, stock: 0 }} onAgregar={() => {}} />);

        expect(screen.getByText('Agotado')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sin stock/i })).toBeDisabled();
    });

    it('no muestra el botón si no se entrega onAgregar', () => {
        render(<TarjetaProducto producto={producto} />);

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});