
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { validarEmail, validarClave } from '../../utils/validaciones';

function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [errores, setErrores] = useState({ email: '', clave: '' });

    function alEnviar(evento) {
        evento.preventDefault();

      
        const nuevos = {
            email: validarEmail(email),
            clave: validarClave(clave),
        };
        setErrores(nuevos);

        if (nuevos.email === '' && nuevos.clave === '' && props.onEnviar) {
            props.onEnviar({ email, clave });
        }
    }

    return (
        <Form onSubmit={alEnviar} noValidate>
            <h2 className="login-title">Iniciar sesión</h2>
            <p className="login-subtitle">Ingrese sus credenciales</p>

            <CampoFormulario
                id="correo"
                etiqueta="Correo"
                tipo="email"
                valor={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errores.email}
            />

            <CampoFormulario
                id="clave"
                etiqueta="Contraseña"
                tipo="password"
                valor={clave}
                onChange={(e) => setClave(e.target.value)}
                error={errores.clave}
            />

            <Boton tipo="submit" texto="Iniciar sesión" className="w-100" />
        </Form>
    );
}

export default LoginForm;
