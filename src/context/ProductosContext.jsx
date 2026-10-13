import { createContext, useContext, useState } from "react";
import * as productoService from '../services/productoService';

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {

    const [productos, setProductos] = useState(() => productoService.listarProductos());

    // vuelve a leer los datos del service
    function recargar() {
        setProductos(productoService.listarProductos());
    }

    // muestra { ok: true, producto } o { ok: false, error } para que la pagian muestre el mensaje del service
    function crear(datos) {
        try {
            const producto = productoService.crearProducto(datos);
            recargar();
            return { ok: true, producto };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    // muestra el producto actualizado
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

// useProductos es un hook 
export function useProductos() {
    const contexto = useContext(ProductosContext);
    if (!contexto) {
        throw new Error('useProductos debe usarse dentro de un ProductosProvider');
    }
    return contexto;
}
