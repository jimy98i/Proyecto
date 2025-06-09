import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { post } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Recuperacion = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");
        setLoading(true);
        try {
            const data = await post('/user/recover', { email });
            if (data && data.message && data.message.startsWith('No existe')) {
                setError(data.message || "No se pudo enviar el correo de recuperación");
            } else if (data && data.message) {
                setSuccess("Se ha enviado una contraseña temporal a tu correo. Por favor, revisa tu bandeja de entrada.");
                setEmail("");
                // Redireccionar al login después de 3 segundos
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError("No se pudo enviar el correo de recuperación");
            }
        } catch (err) {
            setError("Error al enviar la solicitud de recuperación");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <Card style={{ maxWidth: 400, width: "100%" }}>
                <Card.Body>
                    <h2 className="mb-4 text-center">¿Has perdido la contraseña?</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="Introduce tu correo registrado"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading} className="w-100">
                            {loading ? "Enviando..." : "Recuperar contraseña"}
                        </Button>
                    </Form>
                    {success && <Alert variant="success" className="mt-3">{success}</Alert>}
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Recuperacion;