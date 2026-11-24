// Productos: todo pasa por la API (PostgreSQL). No se guarda nada en localStorage.
const API = `${import.meta.env.VITE_API_URL ?? ''}/api/v1`;

export async function listarProductosDesdeAPI() {
    const respuesta = await fetch(`${API}/productos`);

    if (!respuesta.ok) {
        throw new Error('No se pudieron cargar los productos');
    }

    const productos = await respuesta.json();

    // Adapta los nombres de PostgreSQL al formato que ya usa el frontend.
    return productos.map((producto) => ({
        ...producto,
        precio: producto.precio_clp,
        descuento: producto.descuento_pct,
        imagen: producto.imagen_url,
    }));
}


// Convierte el formato de la interfaz al contrato de la API.
function datosParaAPI(datos) {
    return {
        codigo: String(datos.codigo ?? '').trim().toUpperCase(),
        categoria: String(datos.categoria ?? '').trim(),
        nombre: String(datos.nombre ?? '').trim(),
        marca: String(datos.marca ?? '').trim(),
        modelo: String(datos.modelo ?? '').trim(),
        stock: Number(datos.stock),
        precio_clp: Number(datos.precio_clp ?? datos.precio),
        descuento_pct: Number(datos.descuento_pct ?? datos.descuento ?? 0),
        imagen_url: String(datos.imagen_url ?? datos.imagen ?? '').trim(),
    };
}

function productoDesdeAPI(producto) {
    return {
        ...producto,
        precio: Number(producto.precio_clp),
        descuento: Number(producto.descuento_pct),
        imagen: producto.imagen_url,
    };
}

async function solicitarAPI(ruta, token, opciones = {}) {
    if (!token) {
        throw new Error('Inicia sesión como administrador');
    }

    const respuesta = await fetch(ruta, {
        ...opciones,
        headers: {
            ...(opciones.body ? { 'Content-Type': 'application/json' } : {}),
            Authorization: `Bearer ${token}`,
            ...opciones.headers,
        },
    });

    const resultado = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(resultado.error || 'No se pudo completar la operación');
    }

    return resultado;
}

export async function crearProductoEnAPI(datos, token) {
    const resultado = await solicitarAPI(`${API}/productos`, token, {
        method: 'POST',
        body: JSON.stringify(datosParaAPI(datos)),
    });

    return productoDesdeAPI(resultado.producto);
}

export async function actualizarProductoEnAPI(codigo, cambios, token) {
    const resultado = await solicitarAPI(
        `${API}/productos/${encodeURIComponent(codigo)}`,
        token,
        {
            method: 'PUT',
            body: JSON.stringify(datosParaAPI({ ...cambios, codigo })),
        },
    );

    return productoDesdeAPI(resultado.producto);
}

export async function eliminarProductoEnAPI(codigo, token) {
    return solicitarAPI(
        `${API}/productos/${encodeURIComponent(codigo)}`,
        token,
        { method: 'DELETE' },
    );
}

// Cambia solo el stock (admin y vendedor). PATCH /api/v1/productos/:codigo/stock
export async function actualizarStockEnAPI(codigo, stock, token) {
    const resultado = await solicitarAPI(
        `${API}/productos/${encodeURIComponent(codigo)}/stock`,
        token,
        { method: 'PATCH', body: JSON.stringify({ stock: Number(stock) }) },
    );

    return productoDesdeAPI(resultado.producto);
}
