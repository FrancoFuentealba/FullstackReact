import { createContext, useContext, useEffect, useState } from 'react';
import { hayStock } from '../utils/stock';

const CarritoContext = createContext(null);

// Nombre de la caja de localStorage
const CLAVE = 'carrito';

// Lee el carrito guardado. Si no hay nada parte con el carro vacio
function leerCarrito() {
    try {
        const guardado = localStorage.getItem(CLAVE);
        const lista = guardado === null ? [] : JSON.parse(guardado);
        if (!Array.isArray(lista)) return [];
        return lista.filter(
            (item) => item && item.producto && item.producto.codigo && Number.isInteger(item.cantidad) && item.cantidad > 0
        );
    } catch {
        return [];
    }
}

export function CarritoProvider({ children }) {
    // La función lee el localStorage solo la primera vez
    const [items, setItems] = useState(leerCarrito);

    // Cada vez que cambian los items, se guardan. useEffect corre despues de cargar la pantalla
    useEffect(() => {
        localStorage.setItem(CLAVE, JSON.stringify(items));
    }, [items]);

    function sumar(codigo) {
        setItems(items.map((item) =>
            item.producto.codigo === codigo && item.cantidad < item.producto.stock
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        ));
    }

    function agregar(producto) {
        // un producto sin stock no se puede agregar
        if (!hayStock(producto)) return;

        const yaEsta = items.some((item) => item.producto.codigo === producto.codigo);

        if (yaEsta) {
            sumar(producto.codigo);
        } else {
            setItems([...items, { producto, cantidad: 1 }]);
        }
    }

    function restar(codigo) {
        setItems(
            items
                .map((item) =>
                    item.producto.codigo === codigo
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter((item) => item.cantidad > 0)
        );
    }

    function quitar(codigo) {
        setItems(items.filter((item) => item.producto.codigo !== codigo));
    }

    const total = items.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0);
    const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0);

    const valor = { items, agregar, sumar, restar, quitar, total, cantidadTotal };

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
