import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError(false);
    setPasswordError(false);

    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message || 'Error de autenticación o red');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={emailError}
        />
        {emailError && <Form.Text className="text-danger">El campo email es obligatorio.</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={passwordError}
        />
        {passwordError && <Form.Text className="text-danger">El campo contraseña es obligatorio.</Form.Text>}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Form>
  );
};

export default LoginForm; 