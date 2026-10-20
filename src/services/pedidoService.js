// pedidoService: crea y guarda los pedidos. Al confirmar una compra BAJA EL STOCK de los productos.
// JavaScript puro (sin React): se puede probar solo. Usa productoService para leer y cambiar el stock.

import { listarProductos, obtenerProducto, actualizarProducto } from './productoService.js';
import { ESTADOS_PEDIDO, revisarItems, calcularTotalPedido } from '../utils/pedidos.js';

const CLAVE = 'pedidos';

function leer() {
    try {
        const lista = JSON.parse(localStorage.getItem(CLAVE));
        return Array.isArray(lista) ? lista : [];
    } catch {
        return [];
    }
}

function guardar(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// PED-0001, PED-0002... Se toma el número más alto + 1, así un id nunca se repite.
function siguienteId(pedidos) {
    const numeros = pedidos.map((p) => Number(String(p.id).replace('PED-', '')) || 0);
    const siguiente = (numeros.length ? Math.max(...numeros) : 0) + 1;
    return `PED-${String(siguiente).padStart(4, '0')}`;
}

export function listarPedidos() {
    return leer();
}

export function obtenerPedido(id) {
    return leer().find((p) => p.id === id) ?? null;
}

// Confirma una compra. Recibe:
//   items   → el carrito: [{ producto, cantidad }]
//   cliente → { nombre, direccion, tarjetaFinal }  (nunca el número completo de la tarjeta)
//   usuario → correo de quien compra (null si no inició sesión)
// Primero REVISA todo contra los productos actuales; si algo no se puede vender lanza un Error
// y no cambia nada (ni stock ni pedidos). Solo si todo está bien baja el stock y guarda el pedido.
export function crearPedido({ items, cliente, usuario = null }) {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error('El carrito está vacío');
    }

    const { lineas, problemas } = revisarItems(items, listarProductos());
    if (problemas.length > 0) {
        throw new Error(problemas.join('. '));
    }

    for (const linea of lineas) {
        const actual = obtenerProducto(linea.codigo);
        actualizarProducto(linea.codigo, { stock: actual.stock - linea.cantidad });
    }

    const pedidos = leer();
    const pedido = {
        id: siguienteId(pedidos),
        fecha: new Date().toISOString(),
        usuario,
        cliente,
        lineas,
        total: calcularTotalPedido(lineas),
        estado: 'preparacion',
    };
    guardar([...pedidos, pedido]);
    return pedido;
}

// Cambia la etapa de un pedido (lo usa el administrador). Lanza un Error si la etapa no existe;
// devuelve el pedido actualizado, o null si el id no existe.
export function actualizarEstadoPedido(id, estado) {
    if (!ESTADOS_PEDIDO.includes(estado)) {
        throw new Error(`Estado no válido: ${estado}`);
    }

    let actualizado = null;
    const nuevaLista = leer().map((p) => {
        if (p.id !== id) return p;
        actualizado = { ...p, estado };
        return actualizado;
    });

    if (actualizado === null) return null;
    guardar(nuevaLista);
    return actualizado;
}

export function reiniciarPedidos() {
    guardar([]);
}
