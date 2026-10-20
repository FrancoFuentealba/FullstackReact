import { createContext, useContext, useEffect, useState } from 'react';
import {
    agregarItem,
    calcularCantidadTotal,
    calcularTotal,
    limpiarCarrito,
    quitarItem,
    restarItem,
    sumarItem,
} from '../utils/carrito';

const CarritoContext = createContext(null);

// Nombre de la caja de localStorage donde se guarda el carrito
const CLAVE = 'carrito';

// Lee el carrito guardado. Si no hay nada, parte con el carrito vacío
function leerCarrito() {
    try {
        const guardado = localStorage.getItem(CLAVE);
        return limpiarCarrito(guardado === null ? [] : JSON.parse(guardado));
    } catch {
        return [];
    }
}

// cada función le pide el resultado a utils/carrito.js y lo guarda
export function CarritoProvider({ children }) {
    // hace que el carrito se lea de localStorage solo la primera vez
    const [items, setItems] = useState(leerCarrito);

    // Cada vez que cambian los items, se guardan. useeffect corre despues de crear la pantalla
    useEffect(() => {
        localStorage.setItem(CLAVE, JSON.stringify(items));
    }, [items]);

    const agregar = (producto) => setItems((prev) => agregarItem(prev, producto));
    const sumar = (codigo) => setItems((prev) => sumarItem(prev, codigo));
    const restar = (codigo) => setItems((prev) => restarItem(prev, codigo));
    const quitar = (codigo) => setItems((prev) => quitarItem(prev, codigo));
    const vaciar = () => setItems([]); // se usa al confirmar una compra

    const total = calcularTotal(items);
    const cantidadTotal = calcularCantidadTotal(items);

    const valor = { items, agregar, sumar, restar, quitar, vaciar, total, cantidadTotal };

    return (
        <CarritoContext.Provider value={valor}>
            {children}
        </CarritoContext.Provider>
    );
}

// useCarrito es un hook propio
export function useCarrito() {
    const contexto = useContext(CarritoContext);
    if (!contexto) {
        throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
    }
    return contexto;
}

