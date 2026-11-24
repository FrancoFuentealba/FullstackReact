// Productos: todo pasa por la API (PostgreSQL) con Axios. No se guarda nada en localStorage.
import { api, pedir, conToken } from './api.js';
import { crearProductoRequestDto, productoDesdeApiDto } from '../dto/producto.dto.js';

function exigirToken(token) {
    if (!token) throw new Error('Inicia sesión como administrador');
}

// `signal` (AbortController) permite cancelar la carga si el componente se desmonta.
export async function listarProductosDesdeAPI(signal) {
    const productos = await pedir(api.get('/productos', { signal }));
    return productos.map(productoDesdeApiDto);
}

export async function crearProductoEnAPI(datos, token) {
    exigirToken(token);
    const resultado = await pedir(api.post('/productos', crearProductoRequestDto(datos), conToken(token)));
    return productoDesdeApiDto(resultado.producto);
}

export async function actualizarProductoEnAPI(codigo, cambios, token) {
    exigirToken(token);
    const resultado = await pedir(api.put(
        `/productos/${encodeURIComponent(codigo)}`,
        crearProductoRequestDto({ ...cambios, codigo }),
        conToken(token),
    ));
    return productoDesdeApiDto(resultado.producto);
}

// Cambia solo el stock (admin y vendedor).
export async function actualizarStockEnAPI(codigo, stock, token) {
    exigirToken(token);
    const resultado = await pedir(api.patch(
        `/productos/${encodeURIComponent(codigo)}/stock`,
        { stock: Number(stock) },
        conToken(token),
    ));
    return productoDesdeApiDto(resultado.producto);
}

export async function eliminarProductoEnAPI(codigo, token) {
    exigirToken(token);
    return pedir(api.delete(`/productos/${encodeURIComponent(codigo)}`, conToken(token)));
}
