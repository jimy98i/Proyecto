import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';
import { initializeCsrf } from '../utils/api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    // Inicializar CSRF token cuando el componente se monta
    initializeCsrf().catch(error => {
      console.error('Error al inicializar CSRF:', error);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulario enviado');
    setError('');
    setEmailError(false);
    setPasswordError(false);
    setLoading(true);

    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      setLoading(false);
      return;
    }

    try {
      console.log('Intentando login con:', { email });
      await login({ email, password });
    } catch (err) {
      console.error('Error en login:', err);
      setError(err.message || 'Error de autenticación o red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={emailError}
          disabled={loading}
        />
        {emailError && <Form.Text className="text-danger">El campo email es obligatorio.</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={passwordError}
          disabled={loading}
        />
        {passwordError && <Form.Text className="text-danger">El campo contraseña es obligatorio.</Form.Text>}
      </Form.Group>
      <Button 
        variant="primary" 
        type="submit" 
        disabled={loading}
        className="w-50 d-block mx-auto"
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </Button>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </Form>
  );
};

export default LoginForm; 