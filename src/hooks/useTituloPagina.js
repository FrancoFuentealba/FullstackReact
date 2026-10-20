import { useEffect } from 'react';

// Hook propio: cambia el título de la pestaña del navegador (document.title) según la página.
// Se usa al comienzo de cada página:   useTituloPagina('Catálogo');
// Resultado en la pestaña:             "Catálogo | AudioMax"
export function useTituloPagina(titulo) {
    useEffect(() => {
        const tituloAnterior = document.title;
        document.title = `${titulo} | AudioMax`;

        // Al salir de la página se restaura el título anterior (la limpieza del efecto).
        return () => {
            document.title = tituloAnterior;
        };
    }, [titulo]);
}