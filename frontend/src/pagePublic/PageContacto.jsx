import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PageContacto = () => (
  <Container fluid className="p-3" style={{ background: 'rgba(255, 255, 255, 0.76)', minHeight: '100vh', maxWidth: '1400px', margin: '0 auto' }}>
    <Row className="justify-content-center mb-5">
      <Col xs={12} md={10}>
        <h2 style={{ color: '#00796b', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Contacto</h2>
        <Row className="justify-content-center mb-2">
            <Col xs={12} md={10}>
                <div style={{
                background: '#c8e6c9',
                color: '#00796b',
                borderRadius: 14,
                padding: '1.1rem 1.5rem',
                marginBottom: 18,
                fontWeight: 'bold',
                fontSize: '1.18rem',
                boxShadow: '0 2px 8px #e0e0e0',
                textAlign: 'center',
                letterSpacing: '0.5px'
                }}>
                ¿Tienes dudas, necesitas una cita o quieres saber más sobre nuestros servicios? <br />
                ¡Contacta con nuestro equipo y te ayudaremos encantados!
                </div>
            </Col>
        </Row>
        <Card className="shadow border-0 p-4" style={{ background: '#e8f5e9', borderRadius: 18, border: '1.5px solid #b2dfdb' }}>
          <Row>
            {/* Columna izquierda: datos y formulario */}
            <Col xs={12} md={6} className="mb-4 mb-md-0">
              <h3 style={{ color: '#00796b', fontWeight: 'bold' }}>Contacto</h3>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 'bold', color: '#388e3c' }}>Teléfonos:</div>
                <div><a href="tel:900654321" style={{ color: '#00796b', textDecoration: 'none', fontWeight: 'bold' }}>900 654 321</a> (Urgencias)</div>
                <div><a href="tel:900123456" style={{ color: '#388e3c', textDecoration: 'none', fontWeight: 'bold' }}>900 123 456</a> (Citas)</div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 'bold', color: '#388e3c' }}>Correo electrónico:</div>
                <div><a href="mailto:info@veterinariagranada.com" style={{ color: '#00796b', textDecoration: 'none' }}>info@veterinariahappyfriends.com</a></div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 'bold', color: '#388e3c' }}>Dirección:</div>
                <div>Calle Jacinto 2, 18001 Granada</div>
              </div>
              {/* Formulario de contacto */}
              <form>
                <div className="mb-2">
                  <input type="text" className="form-control" placeholder="Nombre" required />
                </div>
                <div className="mb-2">
                  <input type="email" className="form-control" placeholder="Correo electrónico" required />
                </div>
                <div className="mb-2">
                  <textarea className="form-control" placeholder="Mensaje" rows={3} required></textarea>
                </div>
                <button type="submit" className="btn btn-success w-100" style={{ background: '#00796b', border: 'none', fontWeight: 'bold' }}>Enviar mensaje</button>
              </form>
            </Col>
            {/* Columna derecha: mapa */}
            <Col xs={12} md={6} className="d-flex flex-column align-items-center justify-content-center">
              <div style={{ width: '100%', minHeight: 220, border: '2px solid #b2dfdb', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px #e0e0e0', marginBottom: 10 }}>
                <iframe
                  title="Mapa veterinaria"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.857282073812!2d-3.606669684692307!3d37.1764879798767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fccb2e2b2b2b%3A0x2b2b2b2b2b2b2b2b!2sGranada!5e0!3m2!1ses!2es!4v1684250000000!5m2!1ses!2es"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div style={{ textAlign: 'center', color: '#388e3c', fontWeight: 'bold', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <span role="img" aria-label="ubicación" style={{ fontSize: '1.3rem' }}>📍</span>
                Calle Ejemplo 123, 18001 Granada
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default PageContacto;
