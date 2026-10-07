import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection = ({ titulo, subtitulo, textoBoton, rutaBoton }) => {
    return (
        <div className="hero-banner">
            <h1 className="hero-titulo">{titulo}</h1>
            <p className="hero-subtitulo">{subtitulo}</p>
            <Link to={rutaBoton} className="btn-audiomax hero-boton">{textoBoton}</Link>
        </div>
    );
};
