import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import RutaProtegida from './RutaProtegida';

const mocks = vi.hoisted(() => ({ useAuth: vi.fn() }));

vi.mock('../../context/AuthContext', () => ({ useAuth: mocks.useAuth }));

function Login() {
    const { state } = useLocation();
    return <p>Login: {state?.aviso}</p>;
}

function montar(roles) {
    return render(
        <MemoryRouter initialEntries={['/privada']}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/privada" element={<RutaProtegida roles={roles}><p>Contenido privado</p></RutaProtegida>} />
            </Routes>
        </MemoryRouter>,
    );
}

describe('RutaProtegida', () => {
    it('sin sesión redirige al login con aviso', () => {
        mocks.useAuth.mockReturnValue({ usuario: null });
        montar();

        expect(screen.getByText(/Inicia sesión para entrar/)).toBeInTheDocument();
        expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
    });

    it('con sesión y sin lista de roles deja pasar', () => {
        mocks.useAuth.mockReturnValue({ usuario: { rol: 'cliente' } });
        montar();

        expect(screen.getByText('Contenido privado')).toBeInTheDocument();
    });

    it('con un rol sin permiso redirige al login con aviso', () => {
        mocks.useAuth.mockReturnValue({ usuario: { rol: 'vendedor' } });
        montar(['admin']);

        expect(screen.getByText(/No tienes permiso/)).toBeInTheDocument();
        expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
    });

    it('con un rol permitido deja pasar', () => {
        mocks.useAuth.mockReturnValue({ usuario: { rol: 'admin' } });
        montar(['admin']);

        expect(screen.getByText('Contenido privado')).toBeInTheDocument();
    });
});
