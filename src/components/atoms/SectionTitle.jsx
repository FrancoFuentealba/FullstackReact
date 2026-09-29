import React from 'react';

export const SectionTitle = ({ title, subtitle}) => {
    return (
        <div className="text-center mb-4">
            <h2 className="login-title">{title}</h2>
            <p className="login-subtitle">{subtitle}</p>
        </div>
    )
}