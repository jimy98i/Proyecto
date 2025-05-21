import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { get, post, put, del } from '../utils/api';
import { FaUserPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const ClientManagement = () => {
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        password_confirmation: '',
        telefono: '',
        direccion: '',
        rol: 'cliente'
    });
    const [errors, setErrors] = useState({});
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const response = await get('/users/clients/client');
            if (!response.ok) {
                throw new Error('Error al cargar clientes');
            }
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const response = await post('/user', {
                ...formData,
                rol: 'client'
            });
            
            if (!response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    throw new Error(data.message || 'Error al crear el cliente');
                }
                return;
            }

            const data = await response.json();
            setClients(prevClients => [...prevClients, data]);
            setShowModal(false);
            setFormData({
                nombre: '',
                email: '',
                password: '',
                password_confirmation: '',
                telefono: '',
                direccion: '',
                rol: 'cliente'
            });
        } catch (error) {
            console.error('Error:', error);
            setErrors({
                general: ['Error al crear el cliente. Por favor, intente nuevamente.']
            });
        }
    };

    const handleEdit = (client) => {
        setSelectedClient(client);
        setFormData({
            nombre: client.nombre || '',
            email: client.email || '',
            telefono: client.telefono || '',
            direccion: client.direccion || '',
            dni: client.dni || '',
            password: '',
            password_confirmation: '',
            rol: 'client'
        });
        setShowModal(true);
    };

    const handleDelete = async (clientId) => {
        if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
            try {
                const response = await del(`/user/${clientId}`);
                if (!response.ok) throw new Error('Error al eliminar el cliente');
                loadClients();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            email: '',
            password: '',
            password_confirmation: '',
            telefono: '',
            direccion: '',
            rol: 'cliente'
        });
        setSelectedClient(null);
    };

    const filteredClients = clients.filter(client =>
        client.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.dni?.includes(searchTerm)
    );

    return (
        <Container fluid className="mt-4">
            <Card>
                <Card.Header className="bg-primary text-white">
                    <Row className="align-items-center">
                        <Col>
                            <h4 className="mb-0">
                                <FaUserPlus className="me-2" />
                                Gestión de Clientes
                            </h4>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="light"
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                            >
                                <FaUserPlus className="me-2" />
                                Nuevo Cliente
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row className="mb-3">
                        <Col>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaSearch />
                                </span>
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar por nombre, email o DNI..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Table responsive hover className="align-middle">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>DNI</th>
                                <th>Dirección</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.nombre}</td>
                                    <td>{client.email}</td>
                                    <td>{client.telefono}</td>
                                    <td>{client.dni}</td>
                                    <td>{client.direccion}</td>
                                    <td>
                                        <Badge bg={client.active ? 'success' : 'danger'}>
                                            {client.active ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEdit(client)}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDelete(client.id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => {
                setShowModal(false);
                resetForm();
            }} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedClient ? 'Editar Cliente' : 'Nuevo Cliente'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.nombre && <p className="text-danger">{errors.nombre[0]}</p>}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.email && <p className="text-danger">{errors.email[0]}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                    />
                                    {errors.telefono && <p className="text-danger">{errors.telefono[0]}</p>}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleInputChange}
                                    />
                                    {errors.direccion && <p className="text-danger">{errors.direccion[0]}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        {!selectedClient && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        onFocus={() => setShowPasswordRequirements(true)}
                                        onBlur={() => setShowPasswordRequirements(false)}
                                        required
                                    />
                                    {errors.password && <p className="text-danger">{errors.password[0]}</p>}
                                    {showPasswordRequirements && (
                                        <div className="mt-2 p-2 bg-light rounded">
                                            <p className="mb-1">La contraseña debe:</p>
                                            <ul className="mb-0">
                                                <li>Tener al menos 5 caracteres</li>
                                                <li>Coincidir con la confirmación</li>
                                            </ul>
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirmar Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.password_confirmation && <p className="text-danger">{errors.password_confirmation[0]}</p>}
                                </Form.Group>
                            </>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select
                                name="rol"
                                value={formData.rol}
                                onChange={handleInputChange}
                            >
                                <option value="cliente">Cliente</option>
                                <option value="veterinario">Veterinario</option>
                                <option value="admin">Administrador</option>
                            </Form.Select>
                            {errors.rol && <p className="text-danger">{errors.rol[0]}</p>}
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={() => {
                                setShowModal(false);
                                resetForm();
                            }}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                {selectedClient ? 'Actualizar' : 'Crear'} Cliente
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ClientManagement; 