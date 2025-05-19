import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const PetList = ({ userId, onPetSelect }) => {
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(userId);

  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    raza: '',
    edad: '',
    peso: '',
    fecha_nacimiento: '',
    dueno_id: currentUserId
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch(`${API_URL}/pet/client/${localStorage.getItem('userName')}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar las mascotas');
      }

      const data = await response.json();
      setPets(data);
      
      if (data && data.length > 0) {
        setCurrentUserId(data[0].dueno_id);
      }
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
        ? `${API_URL}/pet/${selectedPet.id}`
        : `${API_URL}/pet`;
      
      const method = selectedPet ? 'PUT' : 'POST';
      
      const petData = {
        nombre: formData.nombre,
        tipo: formData.tipo,
        raza: formData.raza || null,
        edad: parseInt(formData.edad),
        peso: parseFloat(formData.peso),
        fecha_nacimiento: formData.fecha_nacimiento,
        dueno_id: currentUserId
      };

      console.log('FormData completo:', formData);
      console.log('Datos a enviar:', petData);

      const response = await fetch(url, {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(petData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Error al guardar la mascota');
      }

      setShowModal(false);
      fetchPets();
      resetForm();
    } catch (error) {
      console.error('Error completo:', error);
      alert(error.message || 'Error al guardar la mascota');
    }
  };

  const handleEdit = (pet) => {
    setSelectedPet(pet);
    setFormData({
      nombre: pet.nombre,
      tipo: pet.tipo,
      raza: pet.raza,
      edad: pet.edad,
      peso: pet.peso,
      fecha_nacimiento: pet.fecha_nacimiento,
      dueno_id: pet.dueno_id
    });
    setShowModal(true);
  };

  const handleDelete = async (petId) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta mascota?')) {
      try {
        const response = await fetch(`${API_URL}/pet/${petId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });

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
    setSelectedPet(null);
    setFormData({
      nombre: '',
      tipo: '',
      raza: '',
      edad: '',
      peso: '',
      fecha_nacimiento: '',
      dueno_id: currentUserId
    });
  };

  return (
    <div className="pet-list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Mis Mascotas</h3>
        <Button variant="primary" onClick={() => {
          resetForm();
          setShowModal(true);
        }}>
          Añadir Mascota
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Peso</th>
            <th>Fecha de Nacimiento</th>
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
              <td>{pet.peso} kg</td>
              <td>{new Date(pet.fecha_nacimiento).toLocaleDateString()}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEdit(pet)}
                >
                  <FaEdit />
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleDelete(pet.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => {
        setShowModal(false);
        resetForm();
      }}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedPet ? 'Editar Mascota' : 'Añadir Nueva Mascota'}
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
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Raza</Form.Label>
              <Form.Control
                type="text"
                name="raza"
                value={formData.raza}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Peso (kg)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                name="peso"
                value={formData.peso}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => {
                setShowModal(false);
                resetForm();
              }}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {selectedPet ? 'Guardar Cambios' : 'Añadir Mascota'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PetList; 