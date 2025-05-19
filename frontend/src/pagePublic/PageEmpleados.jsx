import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PageEmpleados = () => (
  <Container fluid className="p-3" style={{ background: '#fff', minHeight: '100vh', maxWidth: '1400px', margin: '0 auto' }}>
    <Row className="justify-content-center mb-5">
      <Col xs={12} md={10}>
        <Card className="shadow border-0 p-4" style={{ background: '#f1f8e9', borderRadius: 18, border: '1.5px solid #b2dfdb' }}>
          <h2 style={{ color: '#00796b', fontWeight: 'bold' }}>Nuestro Equipo</h2>
          <p style={{ color: '#004d40', fontSize: '1.1rem' }}>
            Conoce a los profesionales que cuidan de tu mascota:
          </p>
          <ul style={{ color: '#388e3c', fontSize: '1.05rem' }}>
            <li>Dr. Juan Pérez – Cirugía y medicina interna</li>
            <li>Dra. Ana López – Diagnóstico por imagen y urgencias</li>
            <li>María García – Auxiliar veterinaria y atención al cliente</li>
            <li>Pedro Ruiz – Peluquería y estética animal</li>
          </ul>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default PageEmpleados;
