import { createContext, useContext, useState } from 'react';

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
    const [items, setItems] = useState([]);

    function sumar(codigo) {
        setItems(items.map((item) =>
            item.producto.codigo === codigo && item.cantidad < item.producto.stock
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        ));
    }

    function agregar(producto) {
        if (producto.stock <= 0) return;

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

export function useCarrito() {
    return useContext(CarritoContext);
}