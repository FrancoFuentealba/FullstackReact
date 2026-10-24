import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import {
    validarObligatorio,
    validarEmail,
    validarClave,
    validarConfirmacion,
    sinErrores,
} from '../../utils/validaciones';

const DATOS_VACIOS = { nombre: '', email: '', clave: '', confirmacion: '' };

function RegistroForm(props) {
    const [datos, setDatos] = useState(DATOS_VACIOS);
    const [errores, setErrores] = useState(DATOS_VACIOS);

    function manejarCambio(e) {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    }

    function alEnviar(evento) {
        evento.preventDefault();

        const nuevos = {
            nombre: validarObligatorio(datos.nombre, 'El nombre es obligatorio'),
            email: validarEmail(datos.email),
            clave: validarClave(datos.clave),
            confirmacion: validarConfirmacion(datos.clave, datos.confirmacion),
        };
        setErrores(nuevos);

        if (sinErrores(nuevos) && props.onEnviar) {
            // la confirmación no se envía: solo sirve para validar
            props.onEnviar({
                nombre: datos.nombre.trim(),
                email: datos.email.trim(),
                clave: datos.clave,
            });
        }
    }

    return (
        <Form onSubmit={alEnviar} noValidate>
            <h2 className="login-title">Crear cuenta</h2>
            <p className="login-subtitle">Regístrate para comprar en AudioMax</p>

            <CampoFormulario
                id="nombre" etiqueta="Nombre completo"
                valor={datos.nombre} onChange={manejarCambio} error={errores.nombre}
            />
            <CampoFormulario
                id="email" etiqueta="Correo" tipo="email"
                valor={datos.email} onChange={manejarCambio} error={errores.email}
            />
            <CampoFormulario
                id="clave" etiqueta="Contraseña" tipo="password"
                valor={datos.clave} onChange={manejarCambio} error={errores.clave}
            />
            <CampoFormulario
                id="confirmacion" etiqueta="Confirmar contraseña" tipo="password"
                valor={datos.confirmacion} onChange={manejarCambio} error={errores.confirmacion}
            />

            {props.error && (
                <Alert variant="danger" className="mt-2">{props.error}</Alert>
            )}

            <Boton tipo="submit" texto="Crear cuenta" className="w-100" />
        </Form>
    );
}

export default RegistroForm;