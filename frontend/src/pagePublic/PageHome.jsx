import React from 'react';
import { Accordion, Container, Row, Col, Card } from 'react-bootstrap';
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from 'react-bootstrap/Carousel';
import dogCampo from '../assets/carrousel/dog-campo.jpg';
import dogBicolor from '../assets/carrousel/dog-bicolor-eye.jpg';
import dogDulce from '../assets/carrousel/dog-dulce.jpg';

const PageHome = () => {
  return (
    <Container fluid className="p-3" style={{ background: 'rgba(255, 255, 255, 0.76)', minHeight: '100vh', maxWidth: '1400px', margin: '0 auto' }}>
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8} className="mt-4 justify-content-center">
          <Card className="shadow border-0" style={{ borderRadius: 24, overflow: 'hidden' }}>
            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <img className="d-block w-100" style={{ maxHeight: 400, objectFit: 'cover' }} src={dogCampo} alt="Mascota feliz" />
                <Carousel.Caption>
                  <h2 style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 2px 8px #000' }}>PORQUE CADA MASCOTA ES ÚNICA</h2>
                  <p style={{ color: '#fff', textShadow: '0 2px 8px #000' }}>Soluciones personalizadas y atención 24h para tu compañero.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" style={{ maxHeight: 400, objectFit: 'cover' }} src={dogDulce} alt="Veterinario a domicilio" />
                <Carousel.Caption>
                  <h2 style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 2px 8px #000' }}>VETERINARIO A DOMICILIO</h2>
                  <p style={{ color: '#fff', textShadow: '0 2px 8px #000' }}>Nos desplazamos para cuidar de tu mascota.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" style={{ maxHeight: 400, objectFit: 'cover' }} src={dogBicolor} alt="Especialidades veterinarias" />
                <Carousel.Caption>
                  <h2 style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 2px 8px #000' }}>ESPECIALIDADES VETERINARIAS</h2>
                  <p style={{ color: '#fff', textShadow: '0 2px 8px #000' }}>Cirugía, diagnóstico, hospitalización y más.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Col xs={12} className="mb-4">
          <h2 className="text-center" style={{ color: '#00796b', fontWeight: 'bold', fontSize: '2.2rem' }}>Nuestros Servicios</h2>
        </Col>
        <Col xs={12} md={10}>
          <Row className="g-4 justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 text-center border-0 shadow" style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #b2dfdb' }}>
                <Card.Body>
                  <div style={{ fontSize: '2.8rem', color: '#00796b', marginBottom: 10 }}>🐾</div>
                  <Card.Title style={{ color: '#00796b', fontWeight: 'bold' }}>Consultas</Card.Title>
                  <Card.Text>Veterinaria general y especializada.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 text-center border-0 shadow" style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #b2dfdb' }}>
                <Card.Body>
                  <div style={{ fontSize: '2.8rem', color: '#0288d1', marginBottom: 10 }}>💉</div>
                  <Card.Title style={{ color: '#0288d1', fontWeight: 'bold' }}>Vacunación</Card.Title>
                  <Card.Text>Vacunas para perros, gatos y exóticos.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 text-center border-0 shadow" style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #b2dfdb' }}>
                <Card.Body>
                  <div style={{ fontSize: '2.8rem', color: '#388e3c', marginBottom: 10 }}>🦷</div>
                  <Card.Title style={{ color: '#388e3c', fontWeight: 'bold' }}>Odontología</Card.Title>
                  <Card.Text>Limpieza dental y tratamientos bucales.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 text-center border-0 shadow" style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #b2dfdb' }}>
                <Card.Body>
                  <div style={{ fontSize: '2.8rem', color: '#fbc02d', marginBottom: 10 }}>🏥</div>
                  <Card.Title style={{ color: '#fbc02d', fontWeight: 'bold' }}>Cirugías</Card.Title>
                  <Card.Text>Intervenciones con equipamiento moderno.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 text-center border-0 shadow" style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #b2dfdb' }}>
                <Card.Body>
                  <div style={{ fontSize: '2.8rem', color: '#00838f', marginBottom: 10 }}>🛁</div>
                  <Card.Title style={{ color: '#00838f', fontWeight: 'bold' }}>Peluquería</Card.Title>
                  <Card.Text>Baño, corte y estética para mascotas.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow border-0 p-4" style={{ background: '#e3f2fd', borderRadius: 18, border: '1.5px solid #b2dfdb' }}>
            <Row className="align-items-center">
              <Col md={7} className="mb-3 mb-md-0">
                <h3 style={{ color: '#c62828', fontWeight: 'bold' }}>URGENCIAS 24h</h3>
                <div style={{ fontSize: '1.3rem', color: '#00796b', fontWeight: 'bold' }}><FontAwesomeIcon icon={faPhone} /> Teléfono Urgencias: <a href="tel:900654321" style={{ color: '#c62828', textDecoration: 'none', fontWeight: 'bold' }}>900 654 321</a></div>
                <div style={{ fontSize: '1.1rem', color: '#004d40', marginTop: 8 }}>Atención inmediata para cualquier emergencia veterinaria, todos los días del año.</div>
              </Col>
              <Col md={5} className="text-md-end text-center">
                <h4 style={{ color: '#00796b', fontWeight: 'bold' }}>Citas y Consultas</h4>
                <div style={{ fontSize: '1.2rem', color: '#00796b', fontWeight: 'bold' }}><FontAwesomeIcon icon={faPhone} /> Teléfono Citas: <a href="tel:900123456" style={{ color: '#004d40', textDecoration: 'none' }}>900 123 456</a></div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <h2 className="mb-4" style={{ color: '#00796b', fontWeight: 'bold', fontSize: '2.2rem' }}>Preguntas Frecuentes</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>¿Cada cuánto debo llevar a mi mascota al veterinario?</Accordion.Header>
          <Accordion.Body>
            Se recomienda al menos una visita anual para un chequeo general, vacunación y desparasitación. En cachorros y animales mayores puede ser necesario acudir con más frecuencia.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>¿Qué vacunas necesita mi perro o gato?</Accordion.Header>
          <Accordion.Body>
            Los perros suelen necesitar vacunas como la antirrábica, parvovirus, moquillo y leptospirosis. Los gatos necesitan contra la leucemia felina, calicivirus, panleucopenia y también la rabia. Consulta al veterinario para un plan personalizado.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>¿Cuándo debo esterilizar a mi mascota?</Accordion.Header>
          <Accordion.Body>
            Generalmente, entre los 6 y 12 meses de edad, aunque puede variar según la especie, tamaño y estado de salud. Esterilizar ayuda a prevenir enfermedades y camadas no deseadas.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>¿Qué signos indican que mi mascota está enferma?</Accordion.Header>
          <Accordion.Body>
            Cambios en el apetito, comportamiento, vómitos, diarrea, letargo, tos o secreciones anormales pueden ser señales de enfermedad. Ante cualquier duda, consulta al veterinario.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>¿Es necesario desparasitar aunque no vea parásitos?</Accordion.Header>
          <Accordion.Body>
            Sí, muchos parásitos no son visibles a simple vista. La desparasitación preventiva es fundamental para la salud de tu mascota y para evitar contagios a humanos.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </Row>
    </Container>
  )
};

export default PageHome;