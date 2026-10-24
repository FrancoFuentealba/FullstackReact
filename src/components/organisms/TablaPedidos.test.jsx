import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TablaPedidos from './TablaPedidos';

const pedido = {
    id: 'PED-0001',
    fecha: '2026-10-22T15:00:00.000Z',
    usuario: 'ana@correo.cl',
    cliente: { nombre: 'Ana Pérez', direccion: 'Calle 1', tarjetaFinal: '4242' },
    lineas: [{ codigo: 'GTR-001', nombre: 'Guitarra', precio: 382500, cantidad: 2, subtotal: 765000 }],
    total: 765000,
    estado: 'preparacion',
};

describe('TablaPedidos', () => {
    it('muestra el pedido con su cliente, sus productos y el total', () => {
        render(<TablaPedidos pedidos={[pedido]} />);

        expect(screen.getByText('PED-0001')).toBeInTheDocument();
        expect(screen.getByText('ana@correo.cl')).toBeInTheDocument();
        expect(screen.getByText('Guitarra × 2')).toBeInTheDocument();
        expect(screen.getByText('$765.000')).toBeInTheDocument();
    });

    it('muestra la etapa actual del pedido en el selector', () => {
        render(<TablaPedidos pedidos={[pedido]} />);

        expect(screen.getByLabelText('Estado del pedido PED-0001')).toHaveValue('preparacion');
    });

    it('avisa con el id y la etapa nueva cuando el administrador cambia el estado', async () => {
        const onCambiarEstado = vi.fn();
        render(<TablaPedidos pedidos={[pedido]} onCambiarEstado={onCambiarEstado} />);

        await userEvent.selectOptions(screen.getByLabelText('Estado del pedido PED-0001'), 'despachado');

        expect(onCambiarEstado).toHaveBeenCalledWith('PED-0001', 'despachado');
    });

    it('muestra un mensaje cuando todavía no hay pedidos', () => {
        render(<TablaPedidos pedidos={[]} />);

        expect(screen.getByText('Aún no hay pedidos.')).toBeInTheDocument();
    });
});
