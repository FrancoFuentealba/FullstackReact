import { describe, expect, it } from 'vitest';
import { obtenerMensajeError, pedir } from './api.js';

describe('obtenerMensajeError (los 3 casos de Axios)', () => {
    it('1) la API respondió con un error: usa el mensaje del backend', () => {
        expect(obtenerMensajeError({ response: { status: 409, data: { error: 'Stock insuficiente' } } }))
            .toBe('Stock insuficiente');
    });

    it('1b) la API respondió sin mensaje: informa el código HTTP', () => {
        expect(obtenerMensajeError({ response: { status: 500, data: {} } }))
            .toBe('La API respondió con un error (500).');
    });

    it('2) tiempo agotado (timeout)', () => {
        expect(obtenerMensajeError({ code: 'ECONNABORTED' })).toMatch(/tardó demasiado/);
    });

    it('3) sin respuesta (red caída, URL o CORS)', () => {
        expect(obtenerMensajeError({ request: {} })).toMatch(/No fue posible contactar la API/);
    });
});

describe('pedir', () => {
    it('devuelve solo los datos de la respuesta', async () => {
        expect(await pedir(Promise.resolve({ data: { ok: true } }))).toEqual({ ok: true });
    });

    it('convierte el fallo en un Error con mensaje legible', async () => {
        await expect(pedir(Promise.reject({ response: { status: 403, data: { error: 'Sin permiso' } } })))
            .rejects.toThrow('Sin permiso');
    });
});
