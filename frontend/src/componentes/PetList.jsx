import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { get, post, put, del } from '../utils/api';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    peso: '',
    cliente_id: ''
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await get(`/pet/client/${localStorage.getItem('userName')}`);
      if (!response.ok) {
        throw new Error('Error al obtener las mascotas');
      }
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error('Error:', error);
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
    try {
      const url = selectedPet 
        ? `/pet/${selectedPet.id}`
        : '/pet';
      
      const method = selectedPet ? put : post;
      const response = await method(url, formData);

      if (!response.ok) {
        throw new Error('Error al guardar la mascota');
      }

      setShowModal(false);
      fetchPets();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (pet) => {
    setSelectedPet(pet);
    setFormData({
      nombre: pet.nombre,
      especie: pet.tipo,
      raza: pet.raza,
      edad: pet.edad,
      peso: pet.peso,
      cliente_id: pet.cliente_id
    });
    setShowModal(true);
  };

  const handleDelete = async (petId) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta mascota?')) {
      try {
        const response = await del(`/pet/${petId}`);
        if (!response.ok) {
          throw new Error('Error al eliminar la mascota');
        }
        fetchPets();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      especie: '',
      raza: '',
      edad: '',
      peso: '',
      cliente_id: ''
    });
    setSelectedPet(null);
  };

  return (
    <div>
      <Button 
        variant="primary" 
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="mb-3"
      >
        Añadir Mascota
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Peso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pets.map(pet => (
            <tr key={pet.id}>
              <td>{pet.nombre}</td>
              <td>{pet.tipo}</td>
              <td>{pet.raza}</td>
              <td>{pet.edad}</td>
              <td>{pet.peso}</td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEdit(pet)}
                >
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(pet.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedPet ? 'Editar Mascota' : 'Añadir Mascota'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Especie</Form.Label>
              <Form.Control
                type="text"
                name="especie"
                value={formData.especie}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Raza</Form.Label>
              <Form.Control
                type="text"
                name="raza"
                value={formData.raza}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Peso</Form.Label>
              <Form.Control
                type="number"
                name="peso"
                value={formData.peso}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {selectedPet ? 'Actualizar' : 'Guardar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PetList; 