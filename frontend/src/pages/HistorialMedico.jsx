import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal, Badge } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFileMedical } from 'react-icons/fa';
import '../css/HistorialMedico.css';

const API_URL = import.meta.env.VITE_API_URL;

const HistorialMedico = () => {
    const [historyLines, setHistoryLines] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedHistoryLine, setSelectedHistoryLine] = useState(null);
    const [pets, setPets] = useState([]);
    const [owners, setOwners] = useState({});
    const [formData, setFormData] = useState({
        historial_id: '',
        mascota_id: '',
        descripcion: '',
        fecha: '',
        estado: 'activo'
    });

    useEffect(() => {
        fetchHistoryLines();
        fetchPets();
    }, []);

    const fetchHistoryLines = async () => {
        try {
            const response = await fetch(`${API_URL}/historyline`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const data = await response.json();
            setHistoryLines(data.data);
        } catch (error) {
            console.error('Error al obtener líneas de historial:', error);
        }
    };

    const fetchPets = async () => {
        try {
            const response = await fetch(`${API_URL}/pet`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const data = await response.json();
            setPets(data.data);
            
            // Obtener los IDs únicos de los dueños
            const ownerIds = [...new Set(data.data.map(pet => pet.dueno_id))];
            
            // Obtener los datos de los dueños
            await Promise.all(ownerIds.map(async (ownerId) => {
                if (ownerId && !owners[ownerId]) {
                    try {
                        const ownerResponse = await fetch(`${API_URL}/user/${ownerId}`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                            }
                        });
                        const ownerData = await ownerResponse.json();
                        setOwners(prev => ({
                            ...prev,
                            [ownerId]: ownerData
                        }));
                    } catch (error) {
                        console.error(`Error al obtener datos del dueño ${ownerId}:`, error);
                    }
                }
            }));
        } catch (error) {
            console.error('Error al obtener mascotas:', error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/appointments/search-history?query=${searchQuery}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const data = await response.json();
            setHistoryLines(data);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = selectedHistoryLine 
                ? `${API_URL}/historyline/${selectedHistoryLine.id}`
                : `${API_URL}/historyline`;
            
            const method = selectedHistoryLine ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowModal(false);
                fetchHistoryLines();
                resetForm();
            }
        } catch (error) {
            console.error('Error al guardar línea de historial:', error);
        }
    };

    const handleEdit = (historyLine) => {
        setSelectedHistoryLine(historyLine);
        setFormData({
            historial_id: historyLine.historial_id,
            mascota_id: historyLine.mascota_id,
            descripcion: historyLine.descripcion,
            fecha: historyLine.fecha,
            estado: historyLine.estado
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta línea de historial?')) {
            try {
                const response = await fetch(`${API_URL}/historyline/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });

                if (response.ok) {
                    fetchHistoryLines();
                }
            } catch (error) {
                console.error('Error al eliminar línea de historial:', error);
            }
        }
    };

    const resetForm = () => {
        setSelectedHistoryLine(null);
        setFormData({
            historial_id: '',
            mascota_id: '',
            descripcion: '',
            fecha: '',
            estado: 'activo'
        });
    };

    return (
        <Container fluid className="historial-medico">
            <Row className="mb-4">
                <Col>
                    <h1>Gestión del Historial Médico</h1>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSearch} className="d-flex gap-2">
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar líneas de historial..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button type="submit" variant="primary">
                                    <FaSearch /> Buscar
                                </Button>
                                <Button 
                                    variant="success" 
                                    onClick={() => {
                                        resetForm();
                                        setShowModal(true);
                                    }}
                                >
                                    <FaPlus /> Nueva Línea
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Mascota</th>
                                        <th>Tipo</th>
                                        <th>Dueño</th>
                                        <th>Descripción</th>
                                        <th>Fecha</th>
                                        <th>Estado</th>
                                        <th>Citas</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyLines.map((historyLine) => {
                                        const mascota = pets.find(pet => pet.id === historyLine.historial_id);
                                        const owner = mascota?.dueno_id ? owners[mascota.dueno_id] : null;
                                        return (
                                            <tr key={historyLine.id}>
                                                <td>{historyLine.id}</td>
                                                <td>{mascota?.nombre}</td>
                                                <td>{mascota?.tipo}</td>
                                                <td>{owner?.nombre || 'No disponible'}</td>
                                                <td>{historyLine.descripcion}</td>
                                                <td>{new Date(historyLine.fecha).toLocaleDateString()}</td>
                                                <td>
                                                    <Badge bg={historyLine.estado === 'activo' ? 'success' : 'secondary'}>
                                                        {historyLine.estado}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    {historyLine.appointments?.length || 0} citas
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleEdit(historyLine)}
                                                    >
                                                        <FaEdit />
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(historyLine.id)}
                                                    >
                                                        <FaTrash />
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedHistoryLine ? 'Editar Línea de Historial' : 'Nueva Línea de Historial'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mascota</Form.Label>
                            <Form.Select
                                value={formData.mascota_id}
                                onChange={(e) => setFormData({...formData, mascota_id: e.target.value})}
                                required
                            >
                                <option value="">Seleccione una mascota</option>
                                {pets.map((pet) => (
                                    <option key={pet.id} value={pet.id}>
                                        {pet.nombre} ({pet.tipo})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.descripcion}
                                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.fecha}
                                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Select
                                value={formData.estado}
                                onChange={(e) => setFormData({...formData, estado: e.target.value})}
                            >
                                <option value="activo">Activo</option>
                                <option value="completado">Completado</option>
                                <option value="cancelado">Cancelado</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                {selectedHistoryLine ? 'Actualizar' : 'Crear'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default HistorialMedico;