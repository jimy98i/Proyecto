import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Iniciar Sesión</h2>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 