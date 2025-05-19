import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import imagen from '../assets/personal/peluquero.jpg';
import imagen2 from '../assets/personal/veterinario_dog.jpg';
import imagen3 from '../assets/personal/voluntario.jpg';
import imagen4 from '../assets/salas/consulta_cirugia.jpg';
import imagen5 from '../assets/salas/laboratorio.jpg';
import imagen6 from '../assets/salas/estetica.jpg';

const equipo = [
  {
    nombre: 'Dr. Juan Pérez',
    rol: 'Veterinario especialista en cirugía y medicina interna',
    img: imagen2, // Poner aquí la ruta de la imagen
    desc: 'Más de 15 años de experiencia en cirugía y diagnóstico avanzado. Referente en medicina interna y cirugía de tejidos blandos.',
  },
  {
    nombre: 'María García',
    rol: 'Peluquera y auxiliar veterinaria',
    img: imagen,
    desc: 'Especialista en estética animal y apoyo en consultas. Su trato cercano y profesionalidad garantizan el bienestar de cada mascota.',
  },
  {
    nombre: 'Pedro Ruiz',
    rol: 'Voluntario y atención al cliente',
    img: imagen3,
    desc: 'Encargado de la atención y acompañamiento de los clientes y sus mascotas. Siempre dispuesto a ayudar y resolver dudas.',
  },
];

const instalaciones = [
  {
    nombre: 'Sala de Cirugía y Consulta',
    img: imagen4, // Poner aquí la ruta de la imagen
    desc: 'Espacio equipado con tecnología de última generación para intervenciones seguras y consultas especializadas.',
  },
  {
    nombre: 'Laboratorio propio',
    img: imagen5,
    desc: 'Permite realizar análisis clínicos rápidos y precisos, facilitando diagnósticos inmediatos y tratamientos eficaces.',
  },
  {
    nombre: 'Sala de Estética',
    img: imagen6,
    desc: 'Zona dedicada al baño, corte y cuidado estético de las mascotas, con equipamiento moderno y productos de alta calidad.',
  },
];

const FadeInCard = ({ children, delay = 0 }) => (
  <div style={{
    opacity: 0,
    animation: `fadeIn 0.9s ease ${delay}s forwards`,
    transform: 'translateY(30px)'
  }}>
    {children}
  </div>
);

const PageNosotros = () => (
  <Container fluid className="p-3" style={{ background: '#fff', minHeight: '100vh', maxWidth: '1400px', margin: '0 auto' }}>
    <Row className="justify-content-center mb-4">
      <Col xs={12} md={10}>
        <Card className="shadow border-0 p-4 mb-4" style={{ background: '#e3f2fd', borderRadius: 18, border: '1.5px solid #b2dfdb' }}>
          <h2 style={{ color: '#00796b', fontWeight: 'bold' }}>Sobre Nosotros</h2>
          <p style={{ color: '#004d40', fontSize: '1.1rem' }}>
            Somos una clínica veterinaria con años de experiencia en el cuidado de mascotas. Nuestro equipo está formado por profesionales apasionados por la salud animal y la atención personalizada.
          </p>
        </Card>
      </Col>
    </Row>
    <Row className="justify-content-center mb-4">
      <Col xs={12} md={10}>
        <h3 style={{ color: '#388e3c', fontWeight: 'bold', marginBottom: 24, textAlign: 'center' }}>Nuestro Equipo</h3>
        <Row className="g-4">
          {equipo.map((persona, idx) => (
            <Col xs={12} md={4} key={persona.nombre} style={{ display: 'flex', justifyContent: 'center' }}>
              <FadeInCard delay={0.1 * idx}>
                <Card className="h-100 border-0 shadow" style={{ borderRadius: 18, overflow: 'hidden', background: '#f1f8e9', minHeight: 370, maxWidth: 340, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch', alignItems: 'center' }}>
                  {persona.img && (
                    <div style={{ width: 120, height: 120, margin: '24px auto 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={persona.img} alt={persona.nombre} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '50%', border: '4px solid #b2dfdb', boxShadow: '0 2px 8px #b2dfdb' }} />
                    </div>
                  )}
                  <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Card.Title style={{ color: '#00796b', fontWeight: 'bold', textAlign: 'center' }}>{persona.nombre}</Card.Title>
                    <div style={{ color: '#388e3c', fontWeight: 500, fontSize: '1.05rem', textAlign: 'center' }}>{persona.rol}</div>
                    <Card.Text style={{ color: '#004d40', marginTop: 8, textAlign: 'center' }}>{persona.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </FadeInCard>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
    <Row className="justify-content-center mb-4">
      <Col xs={12} md={10}>
        <h3 style={{ color: '#388e3c', fontWeight: 'bold', marginBottom: 24, textAlign: 'center' }}>Nuestras Instalaciones</h3>
        <Row className="g-4">
          {instalaciones.map((sala, idx) => (
            <Col xs={12} md={4} key={sala.nombre} style={{ display: 'flex', justifyContent: 'center' }}>
              <FadeInCard delay={0.1 * idx}>
                <Card className="h-100 border-0 shadow" style={{ borderRadius: 18, overflow: 'hidden', background: '#e0f7fa', minHeight: 370, maxWidth: 340, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch', alignItems: 'center' }}>
                  {sala.img && (
                    <div style={{ width: 120, height: 120, margin: '24px auto 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={sala.img} alt={sala.nombre} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '50%', border: '4px solid #b2dfdb', boxShadow: '0 2px 8px #b2dfdb' }} />
                    </div>
                  )}
                  <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Card.Title style={{ color: '#0288d1', fontWeight: 'bold', textAlign: 'center' }}>{sala.nombre}</Card.Title>
                    <Card.Text style={{ color: '#004d40', marginTop: 8, textAlign: 'center' }}>{sala.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </FadeInCard>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
    <style>{`
      @keyframes fadeIn {
        to {
          opacity: 1;
          transform: none;
        }
      }
    `}</style>
  </Container>
);

export default PageNosotros;
