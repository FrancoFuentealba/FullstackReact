import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioCheckout from './FormularioCheckout';

describe('FormularioCheckout', () => {
    it('muestra errores y no cobra cuando los campos están vacíos', async () => {
        const onPagar = vi.fn();
        render(<FormularioCheckout onPagar={onPagar} />);

        await userEvent.click(screen.getByRole('button', { name: /confirmar pago/i }));

        expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
        expect(screen.getByText('La dirección es obligatoria')).toBeInTheDocument();
        expect(screen.getByText('El número de tarjeta es obligatorio')).toBeInTheDocument();
        expect(onPagar).not.toHaveBeenCalled();
    });

    it('rechaza una tarjeta que no tiene 16 dígitos', async () => {
        const onPagar = vi.fn();
        render(<FormularioCheckout onPagar={onPagar} />);

        await userEvent.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez');
        await userEvent.type(screen.getByLabelText('Dirección de envío'), 'Av. Siempre Viva 123');
        await userEvent.type(screen.getByLabelText('Número de Tarjeta'), '1234');
        await userEvent.click(screen.getByRole('button', { name: /confirmar pago/i }));

        expect(screen.getByText('La tarjeta debe tener 16 dígitos')).toBeInTheDocument();
        expect(onPagar).not.toHaveBeenCalled();
    });

    it('entrega solo los últimos 4 dígitos de la tarjeta, nunca el número completo', async () => {
        const onPagar = vi.fn();
        render(<FormularioCheckout onPagar={onPagar} />);

        await userEvent.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez');
        await userEvent.type(screen.getByLabelText('Dirección de envío'), 'Av. Siempre Viva 123');
        await userEvent.type(screen.getByLabelText('Número de Tarjeta'), '4242 4242 4242 4242');
        await userEvent.click(screen.getByRole('button', { name: /confirmar pago/i }));

        expect(onPagar).toHaveBeenCalledWith({
            nombre: 'Ana Pérez',
            direccion: 'Av. Siempre Viva 123',
            tarjetaFinal: '4242',
        });
    });
});