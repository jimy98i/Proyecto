import React, { useState, useEffect } from 'react';
import { Badge, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { get } from '../utils/api';
import { formatDate } from '@fullcalendar/core';

const NotificationBell = () => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPendingAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await get('/appointment');
      
      if (!response.ok) {
        throw new Error('Error al obtener las citas');
      }
      
      const data = await response.json();
      
      const pending = data.filter(appointment => appointment.status === 'programada');
      
      setPendingAppointments(pending);
    } catch (error) {
      console.error('Error al cargar las citas programadas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingAppointments();
    // Actualizar cada minuto
    const interval = setInterval(fetchPendingAppointments, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover id="popover-basic">
          <Popover.Header as="h3">Citas Programadas</Popover.Header>
          <Popover.Body>
            {isLoading ? (
              <p>Cargando citas...</p>
            ) : pendingAppointments.length === 0 ? (
              <p>No hay citas programadas pendientes</p>
            ) : (
              <ul className="list-unstyled">
                {pendingAppointments.map(appointment => (
                  <li key={appointment.id} className="mb-2">
                    <strong>{appointment.title}</strong>
                    <br />
                    <small>
                      {formatDate(`${appointment.start}`, {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </Popover.Body>
        </Popover>
      }
    >
      <Button 
        variant="outline-light" 
        className="position-relative bell-button"
        style={{
          padding: '8px 12px',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 10px'
        }}
      >
        <FaBell style={{ fontSize: '1.2rem' }} />
        {!isLoading && pendingAppointments.length > 0 && (
          <Badge
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle"
            style={{ 
              fontSize: '0.7rem',
              transform: 'translate(-50%, -50%)',
              padding: '4px 6px'
            }}
          >
            {pendingAppointments.length}
          </Badge>
        )}
      </Button>
    </OverlayTrigger>
  );
};

export default NotificationBell; 