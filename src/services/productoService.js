import { productosData } from "../data/productos.js";

//nombre de la caja de localStorage
const CLAVE = 'productos';

// es una copia de los datos de partida
function datosIniciales(){
    return productosData.map((producto) => ({ ...producto}));
}

// actualiza lo que hay dentro del localStorage
function guardar(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// muestra la lista actual
function leer() {
    const guardado = localStorage.getItem(CLAVE)

    if (guardado !== null) {
        try {
            const lista = JSON.parse(guardado)
            if (Array.isArray(lista)) return lista;
        } catch {
            //solo se ignora y vuelve arriba
        }
    }
    // guaradado de datos de partida
    const iniciales = datosIniciales();
    guardar(iniciales)
    return iniciales;
}

// para guardar precio y stock siempre como numero a causa de los formularios
function normalizar(datos) {
    const resultado = { ...datos };
    if (resultado.precio !== undefined) resultado.precio = Number(resultado.precio);
    if (resultado.stock !== undefined) resultado.stock = Number(resultado.stock);
    return resultado;
}

// Compara los codigos sin distiguir laas mayuculas
function mismoCodigo(a, b) {
    return String(a).toUpperCase() === String(b).toUpperCase();
}

// muestra todos los productos
export function listarProductos() {
    return leer();
}

// busca un producto por su codigo
export function obtenerProducto(codigo) {
    return leer().find((p) => p.codigo === codigo) ?? null;
}

// agrega un producto nuevo y si ya existe no lo dejara
export function crearProducto(datos) {
    const lista = leer();
    const codigo = String(datos.codigo ?? '').trim();

    if (codigo === '') {
        throw new Error('El código es obligatorio');
    }
    if (lista.some((p) => mismoCodigo(p.codigo, codigo))) {
        throw new Error(`Ya existe un producto con el código ${codigo}`);
    }

    const nuevo = { ...normalizar(datos), codigo };
    guardar([...lista, nuevo]);
    return nuevo;
}

// actualiza el producto pero solo sus campos indicados
export function actualizarProducto(codigo, cambios) {
    const lista = leer();
    const cambiosSinCodigo = normalizar(cambios);
    delete cambiosSinCodigo.codigo;

    let actualizado = null;
    const nuevaLista = lista.map((p) => {
        if (p.codigo !== codigo) return p;
        actualizado = { ...p, ...cambiosSinCodigo };
        return actualizado;
    });

    if (actualizado === null) return null;

    guardar(nuevaLista);
    return actualizado;
}

// elimina el produto con ese codigo
export function eliminarProducto(codigo) {
    const lista = leer();
    const quedan = lista.filter((p) => p.codigo !== codigo);
    guardar(quedan);
    return quedan.length < lista.length;
}

// para volver a los datos de partida, para restablecer el panel de admin
export function reiniciarProductos() {
    const iniciales = datosIniciales();
    guardar(iniciales);
    return iniciales;
}
export async function listarProductosDesdeAPI() {
    const respuesta = await fetch('/api/productos');

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
    const resultado = await solicitarAPI('/api/productos', token, {
        method: 'POST',
        body: JSON.stringify(datosParaAPI(datos)),
    });

    return productoDesdeAPI(resultado.producto);
}

export async function actualizarProductoEnAPI(codigo, cambios, token) {
    const resultado = await solicitarAPI(
        `/api/productos/${encodeURIComponent(codigo)}`,
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
        `/api/productos/${encodeURIComponent(codigo)}`,
        token,
        { method: 'DELETE' },
    );
}
