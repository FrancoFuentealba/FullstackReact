import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioLogin from './LoginForm';

describe('FormularioLogin', () => {
    it('muestra los campos de correo y contraseña', () => {
        render(<FormularioLogin onEnviar={() => {}} />);

        expect(screen.getByLabelText('Correo')).toBeInTheDocument();
        expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    });


    it('muestra errores y no envía nada cuando los campos están vacíos', async () => {
        const onEnviar = vi.fn();
        render(<FormularioLogin onEnviar={onEnviar} />);

        await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument();
        expect(screen.getByText('La clave debe tener al menos 6 caracteres')).toBeInTheDocument();
        expect(onEnviar).not.toHaveBeenCalled();
    });

    it('avisa que el correo no es válido', async () => {
        const onEnviar = vi.fn();
        render(<FormularioLogin onEnviar={onEnviar} />);

        await userEvent.type(screen.getByLabelText('Correo'), 'ana.correo.cl');
        await userEvent.type(screen.getByLabelText('Contraseña'), '123456');
        await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(screen.getByText('Ingresa un correo válido')).toBeInTheDocument();
        expect(onEnviar).not.toHaveBeenCalled();
    });

    it('entrega el correo y la clave cuando los datos son válidos', async () => {
        const onEnviar = vi.fn();
        render(<FormularioLogin onEnviar={onEnviar} />);

        await userEvent.type(screen.getByLabelText('Correo'), 'ana@correo.cl');
        await userEvent.type(screen.getByLabelText('Contraseña'), '123456');
        await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(onEnviar).toHaveBeenCalledWith({ email: 'ana@correo.cl', clave: '123456' });
    });
});