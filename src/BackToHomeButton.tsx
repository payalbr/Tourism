import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackToHomeButton.css';

const BackToHomeButton: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <button onClick={handleGoHome} className="go-home-button">
            Back to Homepage
        </button>
    );
};

export default BackToHomeButton;
