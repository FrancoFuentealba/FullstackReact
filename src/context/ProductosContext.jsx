import * as productoService from '../services/productoService';
import { createContext, useContext, useEffect, useState } from 'react';

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState(() => productoService.listarProductos());

    useEffect(() => {
        let vigente = true;

        productoService.listarProductosDesdeAPI()
            .then((lista) => {
                if (vigente) setProductos(lista);
            })
            .catch((error) => {
                console.error('No se pudo cargar el catálogo desde la API:', error);
            });

        return () => {
            vigente = false;
        };
    }, []);

    function recargar() {
        setProductos(productoService.listarProductos());
    }

    function crear(datos) {
        try {
            const producto = productoService.crearProducto(datos);
            recargar();
            return { ok: true, producto };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    function actualizar(codigo, cambios) {
        const producto = productoService.actualizarProducto(codigo, cambios);
        recargar();
        return producto;
    }

    function eliminar(codigo) {
        productoService.eliminarProducto(codigo);
        recargar();
    }

    function reiniciar() {
        productoService.reiniciarProductos();
        recargar();
    }

    return (
        <ProductosContext.Provider value={{ productos, crear, actualizar, eliminar, recargar, reiniciar }}>
            {children}
        </ProductosContext.Provider>
    );
}

export function useProductos() {
    const contexto = useContext(ProductosContext);

    if (!contexto) {
        throw new Error('useProductos debe usarse dentro de un ProductosProvider');
    }

    return contexto;
}
