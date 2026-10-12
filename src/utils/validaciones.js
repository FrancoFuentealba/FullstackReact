//validacion de campos obligatorios
export function validarObligatorio(valor, mensaje = 'Este campo es obligatorio') {
    if (String(valor ?? '').trim() === '') return mensaje;
    return '';
}

//validacion de correo
export function validarEmail(valor) {
    const texto = String(valor ?? '').trim();
    if (texto === '') return 'El correo es obligatorio';
    const partes = texto.split('@');
    if (partes.length !== 2 || partes[0] === '') return 'Ingresa un correo valido';
    const dominio = partes[1];
    if (!dominio.includes('.') || dominio.startsWith('.') || dominio.endsWith('.')) {
        return 'Ingresa un correo valido';
    }
    return '';
}

//validacion de clave
export function validarClave(valor) {
    if (String(valor ?? '').length < 6) return 'La clave debe tener al menos 6 caracteres';
    return '';
}

//validacion de numeros
export function validarNumero(valor, minimo, nombreCampo) {
    if (String(valor ?? '').trim() === '') return `${nombreCampo} es obligatorio`;
    const numero = Number(valor);
    if (!Number.isInteger(numero)) return `${nombreCampo} debe ser un número entero`;
    if (numero < minimo) return `${nombreCampo} debe ser al menos ${minimo}`;
    return '';
}

//validar tarjeta
export function validarTarjeta(valor) {
    const limpio = String(valor ?? '').replace(/\s/g, '');
    if (limpio === '') return 'El número de tarjeta es obligatorio';
    if (!/^\d{16}$/.test(limpio)) return 'La tarjeta debe tener 16 dígitos';
    return '';
}

//validacion de datos del checkout
export function validarDatosCheckout(datos) {
    return {
        nombre: validarObligatorio(datos.nombre, 'El nombre es obligatorio'),
        direccion: validarObligatorio(datos.direccion, 'La dirección es obligatoria'),
        tarjeta: validarTarjeta(datos.tarjeta),
    };
}

//validacions del formulario de productos
export function validarDatosProducto(datos, exigirCodigo = true) {
    return {
        codigo: exigirCodigo ? validarObligatorio(datos.codigo, 'El código es obligatorio') : '',
        nombre: validarObligatorio(datos.nombre, 'El nombre es obligatorio'),
        marca: validarObligatorio(datos.marca, 'La marca es obligatoria'),
        modelo: validarObligatorio(datos.modelo, 'El modelo es obligatorio'),
        categoria: validarObligatorio(datos.categoria, 'Selecciona una categoría'),
        precio: validarNumero(datos.precio, 1, 'El precio'),
        stock: validarNumero(datos.stock, 0, 'El stock'),
    };
}

//true si no hay errores
export function sinErrores(errores) {
    return Object.values(errores).every((mensaje) => mensaje === '');
}
