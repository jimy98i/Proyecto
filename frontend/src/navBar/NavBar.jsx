import { React } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import LoginSanctum from '../pages/Login';

const API_URL = import.meta.env.VITE_API_URL;

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si el usuario está autenticado al cargar la página
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      console.log('Auth status:', authStatus); // Depuración
      setIsAuthenticated(authStatus);
    };

    checkAuthStatus();

    // Escucha cambios en localStorage
    window.addEventListener('storage', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLoginLogout = async (event) => {
    event.preventDefault();
    if (isAuthenticated) {
      console.log(localStorage.getItem('access_token'));
      try {
        const userId = localStorage.getItem('user');
        // Realiza la solicitud de logout al backend
        const response = await fetch(`${API_URL}/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          // Elimina el estado de autenticación
          setIsAuthenticated(false);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          localStorage.removeItem('userRole');
          console.log('Usuario deslogueado');
          navigate('/'); // Redirige al login
        } else {
          console.error('Error al cerrar sesión');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    } else {
      // Aquí puedes agregar la lógica para el login
      // Por ejemplo, enviar las credenciales al backend y manejar la respuesta
      console.log('Email:', email);
      console.log('Password:', password);
      setShowModal(false);
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
      <Navbar expand="lg"  className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#link">Nosotros</Nav.Link>
            <Nav.Link href="#link">Contacto</Nav.Link>
            <Button variant="secondary" onClick={isAuthenticated ? handleLoginLogout : handleModalShow}>
              {isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginSanctum onLoginSuccess={() => {
            setIsAuthenticated(true);
            setShowModal(false);
          }} />
        </Modal.Body>
      </Modal>
    </Navbar>
  )
}

export default NavBar