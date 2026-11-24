import * as productoService from '../services/productoService';
import { obtenerToken } from '../services/authService';
import { createContext, useContext, useEffect, useState } from 'react';

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // AbortController: si el componente se desmonta, se cancela la petición en curso.
        const controlador = new AbortController();

        productoService.listarProductosDesdeAPI(controlador.signal)
            .then((lista) => {
                if (!controlador.signal.aborted) setProductos(lista);
            })
            .catch((error) => {
                if (controlador.signal.aborted) return;
                console.error('No se pudo cargar el catálogo desde la API:', error);
            });

        return () => controlador.abort();
    }, []);

    async function recargarDesdeAPI() {
        const lista = await productoService.listarProductosDesdeAPI();
        setProductos(lista);
        return lista;
    }

    async function crear(datos) {
        try {
            const producto = await productoService.crearProductoEnAPI(datos, obtenerToken());
            await recargarDesdeAPI();
            return { ok: true, producto };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    async function actualizar(codigo, cambios) {
        try {
            const producto = await productoService.actualizarProductoEnAPI(
                codigo,
                cambios,
                obtenerToken(),
            );
            await recargarDesdeAPI();
            return { ok: true, producto };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    async function actualizarStock(codigo, stock) {
        try {
            const producto = await productoService.actualizarStockEnAPI(codigo, stock, obtenerToken());
            await recargarDesdeAPI();
            return { ok: true, producto };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    async function eliminar(codigo) {
        try {
            await productoService.eliminarProductoEnAPI(codigo, obtenerToken());
            await recargarDesdeAPI();
            return { ok: true };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    return (
        <ProductosContext.Provider value={{
            productos,
            crear,
            actualizar,
            eliminar,
            actualizarStock,
            recargar: recargarDesdeAPI,
            recargarDesdeAPI,
            reiniciar: recargarDesdeAPI,
        }}>
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
