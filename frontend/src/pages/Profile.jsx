import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav, Image } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPaw, faHistory, faCamera } from '@fortawesome/free-solid-svg-icons';
import PetList from '../componentes/PetList';
import PetHistory from '../componentes/PetHistory';
import UploadPhotoButton from '../componentes/UploadPhotoButton';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
    const { userName, userRole, userEmail, userId, token, profileImage: contextProfileImage } = useAuth();
    const navigate = useNavigate();
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
    const [profileImage, setProfileImage] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        if (userName || userEmail) {
            setFormData(prev => ({
                ...prev,
                name: userName || prev.name,
                email: userEmail || prev.email
            }));
        }
    }, [userName, userEmail, token, navigate]);

    useEffect(() => {
        if (contextProfileImage) {
            setProfileImage(contextProfileImage);
            setImageError(false);
        }
    }, [contextProfileImage]);

    useEffect(() => {
        if (!profileImage && !imageError) {
            const storedImage = localStorage.getItem('profile_image');
            if (storedImage) {
                setProfileImage(storedImage);
            }
        }
    }, [profileImage, imageError]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value || ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            alert('Por favor, complete todos los campos obligatorios');
            return;
        }
    };

    const handleImageError = (e) => {
        setImageError(true);
        setProfileImage(null);
    };

    const handleImageLoad = () => {
        setImageError(false);
    };

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) {
            const urlParts = path.split('/storage/');
            if (urlParts.length > 1) {
                return `${API_URL}/storage/${urlParts[1]}`;
            }
        }
        return `${API_URL}/storage/${path}`;
    };

    return (
        <Container fluid className="profile-main">
            <Row>
                <Col md={9} className="profile-content-col">
                    <Card className="profile-content">
                        <Card.Body>
                            <Nav variant="tabs" className="mb-4">
                                <Nav.Item>
                                    <Nav.Link 
                                        active={activeTab === 'personal'} 
                                        onClick={() => setActiveTab('personal')}
                                    >
                                        <FontAwesomeIcon icon={faUser} className="me-2" />
                                        Información Personal
                                    </Nav.Link>
                                </Nav.Item>
                                {userRole === 'cliente' && (
                                    <>
                                        <Nav.Item>
                                            <Nav.Link 
                                                active={activeTab === 'pets'} 
                                                onClick={() => setActiveTab('pets')}
                                            >
                                                <FontAwesomeIcon icon={faPaw} className="me-2" />
                                                Mis Mascotas
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link 
                                                active={activeTab === 'history'} 
                                                onClick={() => setActiveTab('history')}
                                            >
                                                <FontAwesomeIcon icon={faHistory} className="me-2" />
                                                Historial
                                            </Nav.Link>
                                        </Nav.Item>
                                    </>
                                )}
                            </Nav>

                            {activeTab === 'personal' && (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Contraseña Actual</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Nueva Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Guardar Cambios
                                    </Button>
                                </Form>
                            )}

                            {activeTab === 'pets' && <PetList />}
                            {activeTab === 'history' && <PetHistory />}
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
                                    ) : profileImage ? (
                                        <Image 
                                            src={getImageUrl(profileImage)} 
                                            roundedCircle 
                                            className="profile-image"
                                            onError={handleImageError}
                                            onLoad={handleImageLoad}
                                            crossOrigin="anonymous"
                                        />
                                    ) : (
                                        <div className="profile-image-placeholder">
                                            <FontAwesomeIcon icon={faUser} size="3x" />
                                        </div>
                                    )}
                                    <div className="image-upload-label">
                                        <UploadPhotoButton onPhotoUploaded={(path) => {
                                            setProfileImage(path);
                                            localStorage.setItem('profile_image', path);
                                        }} />
                                    </div>
                                </div>
                                <h4 className="mt-3">{userName}</h4>
                                <p className="text-muted">{userEmail}</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile; 