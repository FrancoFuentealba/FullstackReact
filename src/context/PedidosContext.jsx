// PedidosContext: el puente entre pedidoService y las pantallas.
// Su función principal es confirmarCompra: crea el pedido, baja el stock, vacía el carrito
// y deja la lista de productos al día, todo en una sola llamada.
// Necesita estar DENTRO de AuthProvider, ProductosProvider y CarritoProvider (ver App.jsx).

import { createContext, useContext, useState } from 'react';
import * as pedidoService from '../services/pedidoService';
import { filtrarPorUsuario } from '../utils/pedidos';
import { useAuth } from './AuthContext';
import { useCarrito } from './CarritoContext';
import { useProductos } from './ProductosContext';

const PedidosContext = createContext(null);

export function PedidosProvider({ children }) {
    const { usuario } = useAuth();
    const { items, vaciar } = useCarrito();
    const { recargar: recargarProductos } = useProductos();
    const [pedidos, setPedidos] = useState(() => pedidoService.listarPedidos());

    // Recibe { nombre, direccion, tarjetaFinal } (lo que entrega FormularioCheckout).
    // Devuelve { ok: true, pedido } o { ok: false, error } (por ejemplo, "Guitarra: solo quedan 2 unidades").
    function confirmarCompra(cliente) {
        try {
            const pedido = pedidoService.crearPedido({ items, cliente, usuario: usuario?.email ?? null });
            setPedidos(pedidoService.listarPedidos());
            recargarProductos(); // el stock cambió, el catálogo debe mostrarlo
            vaciar();
            return { ok: true, pedido };
        } catch (error) {
            recargarProductos(); // si falló por stock, se muestran los datos actuales
            return { ok: false, error: error.message };
        }
    }

    // Para el administrador. Devuelve el pedido actualizado, o null si el id no existe.
    function cambiarEstado(id, estado) {
        const pedido = pedidoService.actualizarEstadoPedido(id, estado);
        setPedidos(pedidoService.listarPedidos());
        return pedido;
    }

    const valor = {
        pedidos,                                          // todos (panel de administración)
        misPedidos: filtrarPorUsuario(pedidos, usuario?.email), // solo los del cliente con sesión
        confirmarCompra,
        cambiarEstado,
    };

    return <PedidosContext.Provider value={valor}>{children}</PedidosContext.Provider>;
}

// Desde cualquier página: const { misPedidos, confirmarCompra } = usePedidos()
export function usePedidos() {
    const contexto = useContext(PedidosContext);
    if (!contexto) {
        throw new Error('usePedidos debe usarse dentro de un PedidosProvider');
    }
    return contexto;
}