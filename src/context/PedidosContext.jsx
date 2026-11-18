import { createContext, useContext, useEffect, useState } from 'react';
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
    const [cargandoMisPedidos, setCargandoMisPedidos] = useState(false);
    const [errorMisPedidos, setErrorMisPedidos] = useState('');

    useEffect(() => {
        let vigente = true;

        async function cargarPedidos() {
            if (!usuario) {
                setPedidos([]);
                setErrorMisPedidos('');
                setCargandoMisPedidos(false);
                return;
            }

            const token = obtenerToken();

            if (!token) {
                setPedidos([]);
                setErrorMisPedidos('Tu sesión ya no está disponible. Inicia sesión nuevamente.');
                setCargandoMisPedidos(false);
                return;
            }

            setCargandoMisPedidos(true);
            setErrorMisPedidos('');

            try {
                const lista = usuario.rol === 'admin'
                    ? await pedidoService.listarPedidosAdminDesdeAPI(token)
                    : await pedidoService.listarMisPedidosDesdeAPI(token, usuario.email);

                if (vigente) setPedidos(lista);
            } catch (error) {
                if (vigente) {
                    setPedidos([]);
                    setErrorMisPedidos(error.message);
                }
            } finally {
                if (vigente) setCargandoMisPedidos(false);
            }
        }

        cargarPedidos();

        return () => {
            vigente = false;
        };
    }, [usuario?.id, usuario?.email, usuario?.rol]);

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

    async function cambiarEstado(id, estado) {
        try {
            const token = obtenerToken();
            const actualizado = await pedidoService.actualizarEstadoPedidoEnAPI(
                id,
                estado,
                token,
            );

            setPedidos((actuales) => actuales.map((pedido) => (
                String(pedido.id) === String(id)
                    ? { ...pedido, estado: actualizado.estado }
                    : pedido
            )));

            return { ok: true };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    const valor = {
        pedidos,
        misPedidos: filtrarPorUsuario(pedidos, usuario?.email),
        cargandoMisPedidos,
        errorMisPedidos,
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
