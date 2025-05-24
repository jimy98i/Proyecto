import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const API_URL = import.meta.env.VITE_API_URL;

const CalendarModal = ({ isOpen, onRequestClose, onSubmit, initialData, userRole, onDelete }) => {
  const [formData, setFormData] = useState({
    id: '',
    fecha_cita: '',
    hora_cita: '',
    tipo_cita: '',
    estado: 'programada',
    notas: '',
    linea_historial_id: '',
    mascota_id: '',
    user_id: localStorage.getItem('user_id') || ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [historyLines, setHistoryLines] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    if (initialData) {
       // Validar la fecha si viene del calendario
       if (initialData.fecha_cita) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const selectedDate = new Date(initialData.fecha_cita);
        selectedDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('No puedes seleccionar una fecha anterior a hoy');
            onRequestClose(); // Cerrar el modal si la fecha es inválida
            return;
        }
      }

      setFormData({
          id: initialData.id || '',
          fecha_cita: initialData.fecha_cita || '',
          hora_cita: initialData.hora_cita || '',
          tipo_cita: initialData.tipo_cita || initialData.title || '',
          estado: initialData.estado || 'programada',
          notas: initialData.notas || initialData.descripcion || '',
          linea_historial_id: initialData.linea_historial_id || '',
          mascota_id: initialData.mascota_id || '',
          user_id: initialData.user_id || localStorage.getItem('user_id') || ''
      });
      
      // Si hay una mascota en los datos iniciales, cargar sus líneas de historial
      if (initialData.mascota_id) {
        fetchHistoryLines(initialData.mascota_id);
        // Buscar la mascota en el array de mascotas y establecerla como seleccionada
        const pet = pets.find(pet => pet.id === parseInt(initialData.mascota_id));
        if (pet) {
          setSelectedPet(pet);
        }
      }
    } else {
      // Si es una nueva cita, asegurarnos de que tenga el user_id actual
      setFormData(prev => ({
        ...prev,
        user_id: localStorage.getItem('user_id') || ''
      }));
    }
  }, [initialData, pets]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      // Si es un usuario cliente, obtener solo sus mascotas
      if (userRole === 'cliente') {
        const response = await fetch(`${API_URL}/pet/client/${localStorage.getItem('userName')}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();
        
        
        // La respuesta viene como array directo
        if (Array.isArray(data)) {
          setPets(data);
        } else {
          setPets([]);
        }
      } else {
        // Si es admin, obtener todas las mascotas
        const response = await fetch(`${API_URL}/pet`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setPets(data);
        } else {
          setPets([]);
        }
      }
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
      setPets([]);
    }
  };

  const fetchHistoryLines = async (mascotaId) => {
    try {
      // Primero obtenemos el historial de la mascota
      const historyResponse = await fetch(`${API_URL}/history/${mascotaId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      const historyData = await historyResponse.json();
      
      if (historyData.data && historyData.data.length > 0) {
        const historialId = historyData.data[0].id;
        // Luego obtenemos las líneas de ese historial usando la ruta correcta
        const linesResponse = await fetch(`${API_URL}/historyline?historial_id=${historialId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const linesData = await linesResponse.json();
        setHistoryLines(linesData.data || []);
      } else {
        setHistoryLines([]);
      }
    } catch (error) {
      console.error('Error al obtener líneas de historial:', error);
      setHistoryLines([]);
    }
  };

  const getCsrfToken = async () => {
    try {
      const response = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });
      return document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1];
    } catch (error) {
      console.error('Error al obtener el token CSRF:', error);
      return null;
    }
  };

  const createHistoryLine = async (mascotaId) => {
    try {
      // Obtener el token CSRF
      const csrfToken = await getCsrfToken();
      if (!csrfToken) {
        throw new Error('No se pudo obtener el token CSRF');
      }

      // Primero verificamos si la mascota tiene un historial
      const historyResponse = await fetch(`${API_URL}/history?mascota_id=${mascotaId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const historyData = await historyResponse.json();
      console.log('Respuesta del historial:', historyData);
      
      let historialId;
      
      if (!historyData.data || historyData.data.length === 0) {
        // Si no tiene historial, creamos uno nuevo
        const newHistoryResponse = await fetch(`${API_URL}/history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'X-XSRF-TOKEN': decodeURIComponent(csrfToken)
          },
          credentials: 'include',
          body: JSON.stringify({
            mascota_id: mascotaId,
            descripcion_cliente: 'Historial creado automáticamente'
          })
        });
        const newHistoryData = await newHistoryResponse.json();
        console.log('Respuesta de crear historial:', newHistoryData);
        
        if (!newHistoryData.id) {
          throw new Error('Error al crear el historial: No se recibió un ID válido');
        }
        
        historialId = newHistoryData.id;
      } else {
        historialId = historyData.data[0].id;
      }

      // Creamos la nueva línea de historial
      const newLineResponse = await fetch(`${API_URL}/historyline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'X-XSRF-TOKEN': decodeURIComponent(csrfToken)
        },
        credentials: 'include',
        body: JSON.stringify({
          historial_id: historialId,
          descripcion: `Cita de ${formData.tipo_cita}`,
          fecha: formData.fecha_cita,
          estado: 'activo'
        })
      });

      const newLineData = await newLineResponse.json();
      console.log('Respuesta de crear línea de historial:', newLineData);

      if (!newLineData.id) {
        throw new Error('Error al crear la línea de historial: No se recibió un ID válido');
      }

      return newLineData.id;
    } catch (error) {
      console.error('Error al crear línea de historial:', error);
      throw error;
    }
  };

  const handlePetChange = async (e) => {
    const mascotaId = e.target.value;
    setSelectedPet(pets.find(pet => pet.id === parseInt(mascotaId)));
    setFormData(prev => ({ ...prev, mascota_id: mascotaId, linea_historial_id: '' }));
    await fetchHistoryLines(mascotaId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'fecha_cita') {
        // Obtener la fecha actual sin la hora
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Convertir la fecha seleccionada a objeto Date
        const selectedDate = new Date(value);
        selectedDate.setHours(0, 0, 0, 0);
        
        // Comparar las fechas
        if (selectedDate < today) {
            alert('No puedes seleccionar una fecha anterior a hoy');
            e.target.value = ''; // Limpiar el input
            return;
        }
    }

    setFormData(prevData => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asegurarnos de que el user_id esté presente
      if (!formData.user_id) {
        formData.user_id = localStorage.getItem('user_id');
      }

      // Si no hay una línea de historial seleccionada, creamos una nueva
      if (!formData.linea_historial_id && formData.mascota_id) {
        const newHistoryLineId = await createHistoryLine(formData.mascota_id);
        formData.linea_historial_id = newHistoryLineId;
      }
      
      // Eliminar el campo linea_historial_id ya que no es parte del modelo
      delete formData.linea_historial_id;
      
      onSubmit(formData);
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      alert('Error al procesar el formulario. Por favor, inténtelo de nuevo.');
    }
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

  const checkAvailability = async (fecha_cita, hora_cita) => {
    try {      
      // Obtener el token CSRF
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

  const generateTimeOptions = () => {
    const options = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const isToday = formData.fecha_cita === now.toISOString().split('T')[0];

    // Generar intervalos de 9:30 a 14:30
    let startTime = new Date();
    startTime.setHours(9, 30, 0, 0);
    const endTimeMorning = new Date();
    endTimeMorning.setHours(13, 30, 0, 0);

    while (startTime <= endTimeMorning) {
        const timeStr = startTime.toTimeString().slice(0, 5);
        
        // Si es hoy, solo mostrar horas futuras
        if (!isToday || (startTime.getHours() > currentHour || 
            (startTime.getHours() === currentHour && startTime.getMinutes() > currentMinute))) {
            options.push(timeStr);
        }
        
        startTime.setMinutes(startTime.getMinutes() + 30);
    }

    // Generar intervalos de 17:00 a 21:00
    startTime.setHours(17, 0, 0, 0);
    const endTimeEvening = new Date();
    endTimeEvening.setHours(21, 0, 0, 0);

    while (startTime <= endTimeEvening) {
        const timeStr = startTime.toTimeString().slice(0, 5);
        
        // Si es hoy, solo mostrar horas futuras
        if (!isToday || (startTime.getHours() > currentHour || 
            (startTime.getHours() === currentHour && startTime.getMinutes() > currentMinute))) {
            options.push(timeStr);
        }
        
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
            {userRole === 'cliente' ? (
              // Formulario para clientes
              <>
                <Form.Group className="mb-3" controlId="formMascota">
                  <Form.Label>Mascota</Form.Label>
                  <Form.Select
                    name="mascota_id"
                    value={formData.mascota_id || ''}
                    onChange={handlePetChange}
                    required
                  >
                    <option value="">Seleccione una mascota</option>
                    {pets && pets.length > 0 ? (
                      pets.map((pet) => (
                        <option key={pet.id} value={pet.id}>
                          {pet.nombre} ({pet.tipo})
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No hay mascotas disponibles</option>
                    )}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFechaCita">
                  <Form.Label>Fecha de la Cita</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_cita"
                    value={formData.fecha_cita || ''}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]} // Añadir esta línea
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
                <Form.Group className="mb-3" controlId="formNotas">
                  <Form.Label>Notas</Form.Label>
                  <textarea
                    className="form-control"
                    placeholder='Proporciona una breve descripción del problema que tiene tu mascota.'
                    rows={3}
                    value={formData.notas}
                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  />
                </Form.Group>
              </>
            ) : (
              // Formulario para administradores
              <>
                <Form.Group className="mb-3" controlId="formMascota">
                  <Form.Label>Mascota</Form.Label>
                  <Form.Select
                    name="mascota_id"
                    value={formData.mascota_id || ''}
                    onChange={handlePetChange}
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
                {formData.mascota_id && (
                  <Form.Group className="mb-3" controlId="formHistoryLine">
                    <Form.Label>Línea de Historial</Form.Label>
                    <Form.Select
                      name="linea_historial_id"
                      value={formData.linea_historial_id || ''}
                      onChange={handleInputChange}
                    >
                      <option value="">Crear nueva línea de historial</option>
                      {historyLines.map((line) => (
                        <option key={line.id} value={line.id}>
                          {line.descripcion} ({new Date(line.fecha).toLocaleDateString()})
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                )}
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
                <Form.Group className="mb-3" controlId="formNotas">
                  <Form.Label>Notas</Form.Label>
                  <textarea
                    className="form-control"
                    placeholder='Proporciona una breve descripción del problema que tiene tu mascota.'
                    rows={3}
                    value={formData.notas}
                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  />
                </Form.Group>
              </>
            )}
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