import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistroForm from './RegistroForm';

describe('RegistroForm', () => {
    it('muestra errores y no envía nada cuando los campos están vacíos', async () => {
        const onEnviar = vi.fn();
        render(<RegistroForm onEnviar={onEnviar} />);

        await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

        expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
        expect(screen.getByText('Confirma tu clave')).toBeInTheDocument();
        expect(onEnviar).not.toHaveBeenCalled();
    });

    it('avisa cuando las claves no coinciden', async () => {
        const onEnviar = vi.fn();
        render(<RegistroForm onEnviar={onEnviar} />);

        await userEvent.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez');
        await userEvent.type(screen.getByLabelText('Correo'), 'ana@correo.cl');
        await userEvent.type(screen.getByLabelText('Contraseña'), '123456');
        await userEvent.type(screen.getByLabelText('Confirmar contraseña'), '654321');
        await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

        expect(screen.getByText('Las claves no coinciden')).toBeInTheDocument();
        expect(onEnviar).not.toHaveBeenCalled();
    });

    it('entrega nombre, correo y clave (sin la confirmación) cuando todo es válido', async () => {
        const onEnviar = vi.fn();
        render(<RegistroForm onEnviar={onEnviar} />);

        await userEvent.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez');
        await userEvent.type(screen.getByLabelText('Correo'), 'ana@correo.cl');
        await userEvent.type(screen.getByLabelText('Contraseña'), '123456');
        await userEvent.type(screen.getByLabelText('Confirmar contraseña'), '123456');
        await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

        expect(onEnviar).toHaveBeenCalledWith({
            nombre: 'Ana Pérez', email: 'ana@correo.cl', clave: '123456',
        });
    });
});