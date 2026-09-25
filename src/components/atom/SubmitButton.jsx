import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

export const SubmitButton = ({ text }) => {
    return (
        <Button
            type="submit"
            className="w-100 mt-3 fw-bold"
            >
            {text}
        </Button>
    );
};