import React from 'react';
import { NavbarAudioMax } from '../organisms/NavbarAudioMax.jsx';
import { Footer } from '../organisms/Footer.jsx';

export const PlantillaPublica = ({ children }) => {
    return (
        <div className="plantilla-publica">
            <NavbarAudioMax />
            <main className="plantilla-contenido">
                {children}
            </main>
            <Footer />
        </div>
    );
};
