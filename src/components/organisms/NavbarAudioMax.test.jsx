import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavbarAudioMax from './NavbarAudioMax';

const cliente = { nombre: 'Ana Pérez', email: 'ana@correo.cl', rol: 'cliente' };
const admin = { nombre: 'Administrador AudioMax', email: 'admin@audiomax.cl', rol: 'admin' };

describe('NavbarAudioMax', () => {
    it('sin sesión muestra Iniciar sesion y no muestra Cerrar sesión', () => {
        render(<NavbarAudioMax />);

        expect(screen.getByRole('link', { name: 'Iniciar sesion' })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Cerrar sesión' })).not.toBeInTheDocument();
    });

    it('un cliente ve Mis pedidos y no ve Admin', () => {
        render(<NavbarAudioMax usuario={cliente} />);

        expect(screen.getByText('Hola, Ana')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Mis pedidos' })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Admin' })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Iniciar sesion' })).not.toBeInTheDocument();
    });

    it('un administrador ve Admin y no ve Mis pedidos', () => {
        render(<NavbarAudioMax usuario={admin} />);

        expect(screen.getByRole('link', { name: 'Admin' })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Mis pedidos' })).not.toBeInTheDocument();
    });

    it('avisa cuando se hace clic en Cerrar sesión', async () => {
        const onCerrarSesion = vi.fn();
        render(<NavbarAudioMax usuario={cliente} onCerrarSesion={onCerrarSesion} />);

        await userEvent.click(screen.getByRole('link', { name: 'Cerrar sesión' }));

        expect(onCerrarSesion).toHaveBeenCalledTimes(1);
    });
});