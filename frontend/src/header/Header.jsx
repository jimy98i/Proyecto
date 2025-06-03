import { useState } from 'react';
import { Button, Container, Dropdown, Image, Modal, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../auth/AuthContext';
import logo from '../assets/logo/logo3.png';
import LoginForm from '../componentes/LoginForm';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, userName, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => setShowLoginModal(true);
  const handleCloseModal = () => setShowLoginModal(false);

  const goToProfile = () => {
    if (userRole === 'admin') {
      navigate('/admin/profile');
    } else if (userRole === 'cliente') {
      navigate('/client/myperfil');
    }
  };

  return (
    <>
      <Navbar style={{ backgroundColor: '#d4f1f4' }} expand="lg" className="header">
        <Container>
          <Image
            src={logo}
            className="d-block w-100"
            style={{ maxWidth: 90, marginRight: 12 }}
            roundedCircle
            alt="Logo de la empresa"
          />
          <Navbar.Brand className="fw-bold text-uppercase" style={{ color: '#00796b' }}>
            Happy Friends
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/home" style={{ color: '#004d40' }}>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/contacto" style={{ color: '#004d40' }}>Contacto</Nav.Link>
              <Nav.Link as={NavLink} to="/nosotros" style={{ color: '#004d40' }}>Nosotros</Nav.Link>
              <Nav.Link as={NavLink} to="/servicios" style={{ color: '#004d40' }}>Servicios</Nav.Link>
              {userRole === 'cliente' && (
                <Nav.Link as={NavLink} to="/client/citas" style={{ color: '#004d40' }}>Citas</Nav.Link>
              )}
            </Nav>

            {isAuthenticated ? (
              <Dropdown align="end" drop="down-centered">
                <Dropdown.Toggle
                  variant="outline-light"
                  id="dropdown-user"
                  className="d-flex align-items-center"
                  style={{ backgroundColor: '#e0f7fa', borderColor: '#004d40', color: '#004d40' }}
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  <span className="fw-bold">{userName}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={goToProfile}>Mi Perfil</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant="outline-light"
                onClick={handleLogin}
                className="ms-3"
                style={{ backgroundColor: '#e0f7fa', borderColor: '#004d40', color: '#004d40' }}
              >
                Login
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLoginModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;