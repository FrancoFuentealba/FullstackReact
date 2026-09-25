import React from 'react';

export const SectionTitle = ({ title, subtitle}) => {
    return (
        <div className="text-center mb-4">
            <h2 className="display-4">{title}</h2>
            <p className="lead">{subtitle}</p>
        </div>
    )
}