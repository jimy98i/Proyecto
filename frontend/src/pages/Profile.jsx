import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav, Image } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPaw, faHistory, faCamera } from '@fortawesome/free-solid-svg-icons';
import PetList from '../componentes/PetList';
import '../css/Profile.css';

const Profile = () => {
  const { userName, userRole, userEmail, userId } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    name: userName || '',
    email: userEmail || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (userName || userEmail) {
      setFormData(prev => ({
        ...prev,
        name: userName || prev.name,
        email: userEmail || prev.email
      }));
    }
  }, [userName, userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value || ''
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }
    console.log('Datos actualizados:', formData);
  };

  return (
    <div className="profile-main">
      <Container fluid className="profile-container">
        <Row className="profile-row">
          <Col md={9} className="profile-content-col">
            <Card className="profile-content">
              <Card.Body>
                {activeTab === 'personal' && (
                  <Form onSubmit={handleSubmit}>
                    <h3 className="mb-4">Información Personal</h3>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        className="profile-input"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className="profile-input"
                        required
                      />
                    </Form.Group>
                    <h4 className="mt-4 mb-3">Cambiar Contraseña</h4>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña Actual</Form.Label>
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword || ''}
                        onChange={handleInputChange}
                        className="profile-input"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nueva Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={formData.newPassword || ''}
                        onChange={handleInputChange}
                        className="profile-input"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword || ''}
                        onChange={handleInputChange}
                        className="profile-input"
                      />
                    </Form.Group>
                    <Button type="submit" className="profile-button">
                      Guardar Cambios
                    </Button>
                  </Form>
                )}

                {activeTab === 'pets' && (
                  <div>
                    <PetList userId={userId} />
                  </div>
                )}

                {activeTab === 'history' && (
                  <div>
                    <h3 className="mb-4">Historial Médico</h3>
                    {/* Aquí irá el componente de historial médico */}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="profile-sidebar-col">
            <Card className="profile-sidebar">
              <Card.Body>
                <div className="text-center mb-4">
                  <div className="profile-image-container">
                    {previewUrl ? (
                      <Image src={previewUrl} roundedCircle className="profile-image" />
                    ) : (
                      <div className="profile-image-placeholder">
                        <FontAwesomeIcon icon={faUser} size="3x" />
                      </div>
                    )}
                    <label htmlFor="image-upload" className="image-upload-label">
                      <FontAwesomeIcon icon={faCamera} />
                    </label>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="image-upload-input"
                    />
                  </div>
                  <h4 className="mt-3">{userName}</h4>
                  <p className="text-muted">{userEmail}</p>
                </div>

                <Nav className="flex-column">
                  <Nav.Link
                    className={activeTab === 'personal' ? 'active' : ''}
                    onClick={() => setActiveTab('personal')}
                  >
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Información Personal
                  </Nav.Link>
                  <Nav.Link
                    className={activeTab === 'pets' ? 'active' : ''}
                    onClick={() => setActiveTab('pets')}
                  >
                    <FontAwesomeIcon icon={faPaw} className="me-2" />
                    Mis Mascotas
                  </Nav.Link>
                  <Nav.Link
                    className={activeTab === 'history' ? 'active' : ''}
                    onClick={() => setActiveTab('history')}
                  >
                    <FontAwesomeIcon icon={faHistory} className="me-2" />
                    Historial Médico
                  </Nav.Link>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile; 