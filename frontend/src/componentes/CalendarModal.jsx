import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const API_URL = import.meta.env.VITE_API_URL;

const CalendarModal = ({ isOpen, onRequestClose, onSubmit, initialData, userRole, onDelete }) => {
  const [formData, setFormData] = useState(initialData);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const checkAvailability = async (fecha_cita, hora_cita) => {
    try {      
      // Primero obtenemos el token CSRF
      const csrfResponse = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!csrfResponse.ok) {
        throw new Error('Error al obtener el token CSRF');
      }

      // Obtener el token XSRF de las cookies
      const xsrfToken = getCookie('XSRF-TOKEN');
      console.log('Token XSRF obtenido:', xsrfToken);

      const response = await fetch(`${API_URL}/appointment/check-availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken)
        },
        credentials: 'include',
        body: JSON.stringify({ fecha_cita, hora_cita })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al verificar la disponibilidad');
      }

      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error('Error completo al verificar la disponibilidad:', error);
      return false;
    }
  };

  // Función auxiliar para obtener el valor de una cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const token = parts.pop().split(';').shift();
      return token;
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleHoraCitaChange = async (e) => {
    const { value } = e.target;
    
    if (!formData.fecha_cita) {
      alert('Por favor, seleccione primero una fecha');
      return;
    }

    const isAvailable = await checkAvailability(formData.fecha_cita, value);
    
    if (!isAvailable) {
      alert('La hora seleccionada ya está ocupada. Por favor, elija otra hora.');
      return;
    }

    setFormData(prevData => ({
      ...prevData,
      hora_cita: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDelete = async () => {
    try {
      if (onDelete && formData.id) {
        await onDelete(formData.id);
        onRequestClose();
      }
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      alert('Error al eliminar la cita. Por favor, inténtelo de nuevo.');
    }
  };

  const generateTimeOptions = () => {
    const options = [];

    // Generar intervalos de 9:30 a 14:30
    let startTime = new Date();
    startTime.setHours(9, 30, 0, 0);
    const endTimeMorning = new Date();
    endTimeMorning.setHours(13, 30, 0, 0);

    while (startTime <= endTimeMorning) {
      options.push(startTime.toTimeString().slice(0, 5));
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    // Generar intervalos de 17:00 a 21:00
    startTime.setHours(17, 0, 0, 0);
    const endTimeEvening = new Date();
    endTimeEvening.setHours(21, 0, 0, 0);

    while (startTime <= endTimeEvening) {
      options.push(startTime.toTimeString().slice(0, 5));
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <>
      <Modal show={isOpen} onHide={onRequestClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Añadir/Editar Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFechaCita">
              <Form.Label>Fecha de la Cita</Form.Label>
              <Form.Control
                type="date"
                name="fecha_cita"
                value={formData.fecha_cita || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHoraCita">
              <Form.Label>Hora de la Cita</Form.Label>
              <Form.Select
                name="hora_cita"
                value={formData.hora_cita || ''}
                onChange={handleHoraCitaChange}
                required
              >
                <option value="">Seleccione una hora</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </Form.Select>
            </Form.Group>
            {userRole === 'admin' && (
              <Form.Group className="mb-3" controlId="formTipoCita">
                <Form.Label>Tipo de Cita</Form.Label>
                <Form.Select
                  name="tipo_cita"
                  value={formData.tipo_cita || ''}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="consulta">Consulta</option>
                  <option value="revisión">Revisión</option>
                  <option value="urgencia">Urgencia</option>
                  <option value="vacunación">Vacunación</option>
                  <option value="operación">Operación</option>
                </Form.Select>
              </Form.Group>
            )}
            {userRole === 'admin' && (
              <Form.Group className="mb-3" controlId="formEstado">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  value={formData.estado || ''}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un estado</option>
                  <option value="programada">Programada</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                  <option value="completada">Completada</option>
                </Form.Select>
              </Form.Group>
            )}
              <Form.Group className="mb-3" controlId="formNotas">
                <Form.Label>Notas</Form.Label>
                <textarea
                  className="form-control"
                  placeholder='Proporciona una breve descriopción del problema que tiene tu mascota.'
                  rows={3}
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                />
              </Form.Group>
            <div className="d-flex justify-content-between">
              {formData.id && (
                <Button 
                  variant="danger" 
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Eliminar
                </Button>
              )}
              <div>
                <Button variant="secondary" onClick={onRequestClose} className="me-2">
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar esta cita? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CalendarModal;