import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;

const Recuperacion = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/user/recover`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "No se pudo enviar el correo de recuperación");
            } else {
                setSuccess("Se ha enviado una nueva contraseña temporal a tu correo electrónico. Por favor, revisa tu bandeja de entrada y cambia la contraseña al iniciar sesión.");
                setEmail("");
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