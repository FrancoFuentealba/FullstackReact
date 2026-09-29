import React from 'react';
import { Form } from 'react-bootstrap';

export const FormGroupField = ({ controlId, label, type, placeholder }) => {
    return (
        <Form.Group className="mb-3 text-start" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                required
                className="custom-input"
                />
        </Form.Group>
    )
}