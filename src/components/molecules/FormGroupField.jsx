import React from 'react';
import { Form } from 'react-boostrap';

export const FormGroupField = ({ controlId, label, type, placeholder }) => {
    return (
        <Form.FormGroup className="mb-3 text-start" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                required
                />
        </Form.FormGroup>
    )
}