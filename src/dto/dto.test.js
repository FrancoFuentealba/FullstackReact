import { describe, expect, it } from 'vitest';
import { crearLoginRequestDto, crearRegistroRequestDto } from './auth.dto.js';
import { crearProductoRequestDto, productoDesdeApiDto } from './producto.dto.js';
import { crearPedidoRequestDto, pedidoDesdeApiDto } from './pedido.dto.js';

describe('DTO', () => {
    it('auth: normaliza correo y renombra clave a password', () => {
        expect(crearLoginRequestDto({ email: ' A@B.cl ', clave: 'x' })).toEqual({ email: 'a@b.cl', password: 'x' });
        expect(crearRegistroRequestDto({ nombre: ' Ana ', email: 'A@B.cl', clave: 'x' }))
            .toEqual({ nombre: 'Ana', email: 'a@b.cl', password: 'x' });
    });

    it('producto: convierte formulario a contrato de API y viceversa', () => {
        const dto = crearProductoRequestDto({
            codigo: ' gtr-1 ', categoria: 'Guitarras', nombre: 'G', marca: 'F', modelo: 'M',
            stock: '4', precio: '1000', descuento: '10', imagen: '/i.jpg',
        });
        expect(dto).toMatchObject({ codigo: 'GTR-1', stock: 4, precio_clp: 1000, descuento_pct: 10, imagen_url: '/i.jpg' });

        expect(productoDesdeApiDto({ codigo: 'A', precio_clp: '1000', descuento_pct: '0', imagen_url: '/i.jpg' }))
            .toMatchObject({ precio: 1000, descuento: 0, imagen: '/i.jpg' });
    });

    it('pedido: la petición envía solo código y cantidad; la respuesta se convierte a números', () => {
        expect(crearPedidoRequestDto({
            items: [{ producto: { codigo: 'A', precio: 99 }, cantidad: 2 }],
            cliente: { nombre: 'Ana', direccion: 'Calle 1', tarjetaFinal: '1234' },
        })).toEqual({
            cliente: { nombre: 'Ana', direccion: 'Calle 1' },
            items: [{ codigo: 'A', cantidad: 2 }],
        });

        const pedido = pedidoDesdeApiDto({
            id: 7, fecha: 'f', estado: 'preparacion', total_clp: '300', usuario: 'a@b.cl',
            nombre_destinatario: 'Ana', direccion_entrega: 'Calle 1',
            lineas: [{ codigo: 'A', nombre: 'N', cantidad: '2', precio_unitario_clp: '150', subtotal_clp: '300' }],
        });
        expect(pedido).toMatchObject({ id: '7', total: 300, usuario: 'a@b.cl' });
        expect(pedido.lineas[0]).toMatchObject({ cantidad: 2, precio: 150, subtotal: 300 });
    });
});
