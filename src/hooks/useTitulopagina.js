import { useEffect } from "react";

//hook propio que cambia el titulo de la pestana del navegador segun la pagina
export function useTituloPagina(titulo) {
    useEffect(() => {
        const tituloAnterior = document.title;
        document.title = `${titulo} | AudioMax`;

        // al salir de la pagina se devuelve el titulo anterior
        return () => {
            document.title = tituloAnterior;
        }
    }, [titulo]);
}