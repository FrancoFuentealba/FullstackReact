import React from 'react';
import { SectionTitle } from "../atoms/SectionTitle.jsx";
import { SubmitButton } from "../atoms/SubmitButton.jsx";
import { FormGroupField } from "../molecules/FormGroupField.jsx";
import { Container, Row, Col, Form } from 'react-bootstrap';

export const LoginForm = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg="4">
                    <div className="login-card">
                        <SectionTitle title="Iniciar sesion" subtitle="Ingrese sus credenciales" />

                        <Form noValidate>{/*solucionar la validacion*/}
                            {/*Moleculas*/}
                            <FormGroupField
                                controlId="emailLogin"
                                label="Correo electronico"
                                type="email"
                                placeholder="Ingrese su correo electronico"
                            />
                            <FormGroupField
                                controlId="passwordLogin"
                                label="Contraseña"
                                type="password"
                                placeholder="Ingrese su contraseña"
                            />
                            {/*Atomo*/}
                            <SubmitButton text="Iniciar sesion" />
                        </Form>

                        <div className="text-center mt-3">
                            <a href="/">← Volver a la pagina principal</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
                    
                        
