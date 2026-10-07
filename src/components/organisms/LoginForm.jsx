import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginForm() {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: conectar con el login real
        console.log({ correo, clave });
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={4}>
                    <h2 className="login-title">Iniciar sesion</h2>
                    <p className="login-subtitle">Ingrese sus credenciales</p>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="correo">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="clave">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" className="w-100">Iniciar sesion</Button>
                    </Form>

                    <div className="mt-3 text-center">
                        <Link to="/">Volver al inicio</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;

                    
                        
