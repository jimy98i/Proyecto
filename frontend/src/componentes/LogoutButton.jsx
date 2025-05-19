import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('access_token');
        navigate('/'); // Redirige al usuario a la página principal
    };

    return (
        <Button variant="outline-light" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;