import { useState } from "react";
import { Form } from "react-bootstrap";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import { validarDatosCheckout, sinErrores } from "../../utils/validaciones";

const DATOS_VACIOS = { nombre: '', direccion: '', tarjeta: '' };

function FormularioCheckout(props) {
    const [datos, setDatos] = useState(DATOS_VACIOS);
    const [errores, setErrores] = useState(DATOS_VACIOS);

    function manejarCambio(e) {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    }

    function alPagar(evento) {
        evento.preventDefault();

        const nuevosErrores = validarDatosCheckout(datos);
        setErrores(nuevosErrores);

        if (sinErrores(nuevosErrores) && props.onPagar) {
            props.onPagar({
                nombre: datos.nombre.trim(),
                direccion: datos.direccion.trim(),
                tarjetaFinal: datos.tarjeta.replace(/\s/g, '').slice(-4),
            });
        }
    }

    return (
        <Form onSubmit={alPagar} noValidate className="formulario-checkout">
            <h4 className="mb-3">Datos de Envío y Pago</h4>
            <CampoFormulario
                id="nombre" name="nombre" etiqueta="Nombre completo"
                valor={datos.nombre} onChange={manejarCambio} error={errores.nombre}
            />
            <CampoFormulario
                id="direccion" name="direccion" etiqueta="Dirección de envío"
                valor={datos.direccion} onChange={manejarCambio} error={errores.direccion}
            />
            <CampoFormulario
                id="tarjeta" name="tarjeta" etiqueta="Número de Tarjeta"
                placeholder="1234 5678 9012 3456"
                valor={datos.tarjeta} onChange={manejarCambio} error={errores.tarjeta}
            />
            <Boton tipo="submit" texto="Confirmar Pago" variante="success" className="w-100" />
        </Form>
    );
}

export default FormularioCheckout;