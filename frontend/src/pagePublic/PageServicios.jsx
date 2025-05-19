import React from 'react';
import imagen from '../assets/servicios/consultas.jpg';
import Imagen2 from '../assets/servicios/vacunacion.jpg';
import Imagen3 from '../assets/servicios/cirugia.jpg';
import Imagen4 from '../assets/servicios/diagnostico.jpg';
import Imagen5 from '../assets/servicios/odontologia.jpg';
import Imagen6 from '../assets/servicios/peluqueria.jpg';
import Imagen7 from '../assets/servicios/urgencias.jpg';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Si aún no tienes las imágenes, puedes usar un placeholder temporal
const placeholder = 'https://via.placeholder.com/180x160?text=Foto+Servicio';

const servicios = [
  {
    titulo: 'Consultas',
    descripcion: 'Veterinaria general y especializada para perros, gatos y exóticos. Atención personalizada y seguimiento integral.',
    imagen: imagen, // Cambia por import imagen cuando la tengas
    color: '#b2dfdb',
  },
  {
    titulo: 'Vacunación',
    descripcion: 'Vacunas y desparasitaciones para la prevención de enfermedades. Calendario adaptado a cada mascota.',
    imagen: Imagen2,
    color: '#e0f7fa',
  },
  {
    titulo: 'Cirugías',
    descripcion: 'Intervenciones quirúrgicas con equipamiento moderno y máxima seguridad. Hospitalización y cuidados postoperatorios.',
    imagen: Imagen3,
    color: '#ffe082',
  },
  {
    titulo: 'Diagnóstico por imagen',
    descripcion: 'Radiografía digital, ecografía y otros métodos avanzados para un diagnóstico preciso y rápido.',
    imagen: Imagen4,
    color: '#b3e5fc',
  },
  {
    titulo: 'Odontología',
    descripcion: 'Limpieza dental, extracciones y tratamientos bucales para la salud oral de tu mascota.',
    imagen: Imagen5,
    color: '#c8e6c9',
  },
  {
    titulo: 'Peluquería',
    descripcion: 'Baño, corte y estética animal. Cuidamos la higiene y el bienestar de tu mascota.',
    imagen: Imagen6,
    color: '#f8bbd0',
  },
  {
    titulo: 'Urgencias 24h',
    descripcion: 'Atención veterinaria urgente todos los días del año, las 24 horas.',
    imagen: Imagen7,
    color: '#ffcdd2',
  },
];

const DiagonalSeparator = ({ color = '#b2dfdb' }) => (
  <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none" style={{ display: 'block' }}>
    <polygon points="0,0 100,30 100,0" fill={color} />
  </svg>
);

const PageServicios = () => (
  <Container fluid className="p-3" style={{ background: '#fff', minHeight: '100vh', maxWidth: '1400px', margin: '0 auto' }}>
    <Row className="justify-content-center mb-5">
      <Col xs={12} md={10}>
        <h2 className="text-center mb-4" style={{ color: '#00796b', fontWeight: 'bold' }}>Nuestros Servicios</h2>
        {servicios.map((serv, idx) => (
          <div key={serv.titulo} style={{ position: 'relative', marginBottom: 0 }}>
            <Card className="mb-0 border-0 shadow" style={{ borderRadius: 18, overflow: 'hidden', background: serv.color }}>
              <Row className="align-items-center flex-column flex-md-row" style={{ minHeight: 220 }}>
                <Col xs={12} md={4} className="p-0 d-flex justify-content-center align-items-center" style={{ background: '#fff', minHeight: 180 }}>
                  <img src={serv.imagen} alt={serv.titulo} style={{ width: '100%', maxWidth: 180, height: 160, objectFit: 'cover', borderRadius: 14, boxShadow: '0 2px 8px #b2dfdb' }} />
                </Col>
                <Col xs={12} md={8} className="p-4">
                  <h4 style={{ color: '#00796b', fontWeight: 'bold' }}>{serv.titulo}</h4>
                  <p style={{ color: '#004d40', fontSize: '1.08rem', marginBottom: 0 }}>{serv.descripcion}</p>
                </Col>
              </Row>
            </Card>
            {idx < servicios.length - 1 && (
              <DiagonalSeparator color={servicios[idx + 1].color} />
            )}
          </div>
        ))}
      </Col>
    </Row>
  </Container>
);

export default PageServicios;
