import React from 'react';
import { NavbarAudioMax } from '../organisms/NavbarAudioMax.jsx';

export const PlantillaPublica = ({ children }) => {
    return (
        // flexbox para asegurar que el footer siempre quede abajo
        <div className="d-flex flex-column min-vh-100">
            {/* 1. EL ENCABEZADO */}
            <NavbarAudioMax />
            {/* 2. EL CONTENIDO */}
            <main className="flex-grow-1">
                {children}
            </main>
            {/* 3. EL PIE DE PÁGINA */}
            <footer className="footer-audiomax py-4 text-center mt-auto">
                <p className="mb-0 fw-bold">© 2026 <span className="texto-naranja">AudioMax</span> Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}