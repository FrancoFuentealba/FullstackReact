import { createContext, useContext, useState } from 'react';
import * as pedidoService from '../services/pedidoService';
import { obtenerToken } from '../services/authService';
import { filtrarPorUsuario } from '../utils/pedidos';
import { useAuth } from './AuthContext';
import { useCarrito } from './CarritoContext';
import { useProductos } from './ProductosContext';

const PedidosContext = createContext(null);

export function PedidosProvider({ children }) {
    const { usuario } = useAuth();
    const { items, vaciar } = useCarrito();
    const { recargarDesdeAPI } = useProductos();
    const [pedidos, setPedidos] = useState([]);

    async function confirmarCompra(cliente) {
        let pedido;

        try {
            pedido = await pedidoService.crearPedidoDesdeAPI({
                items,
                cliente,
                token: obtenerToken(),
                email: usuario?.email ?? null,
            });
        } catch (error) {
            try {
                await recargarDesdeAPI();
            } catch {
                // Conserva el error original de la compra.
            }

            return { ok: false, error: error.message };
        }

        setPedidos((actuales) => [pedido, ...actuales]);
        vaciar();

        try {
            await recargarDesdeAPI();
        } catch (error) {
            console.error('La compra se guardó, pero no se pudo actualizar el catálogo:', error);
        }

        return { ok: true, pedido };
    }

    function cambiarEstado() {
        return null; // Se conectará al endpoint administrativo en el siguiente paso.
    }

    const valor = {
        pedidos,
        misPedidos: filtrarPorUsuario(pedidos, usuario?.email),
        confirmarCompra,
        cambiarEstado,
    };

    return (
        <PedidosContext.Provider value={valor}>
            {children}
        </PedidosContext.Provider>
    );
}

export function usePedidos() {
    const contexto = useContext(PedidosContext);

    if (!contexto) {
        throw new Error('usePedidos debe usarse dentro de un PedidosProvider');
    }

    return contexto;
}
