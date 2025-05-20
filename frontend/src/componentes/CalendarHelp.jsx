import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CalendarHelp = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Guía de Uso del Calendario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="calendar-help">
          <h5>¿Cómo usar el calendario?</h5>
          
          <div className="help-section mb-3">
            <h6>📅 Al hacer clic en un día vacío:</h6>
            <ul>
              <li>Se abrirá un formulario para crear una nueva cita</li>
              <li>Podrás seleccionar la fecha y hora</li>
              <li>Añadir notas sobre el motivo de la visita</li>
              <li>El sistema verificará automáticamente la disponibilidad</li>
            </ul>
          </div>

          <div className="help-section mb-3">
            <h6>📝 Al hacer clic en una cita existente:</h6>
            <ul>
              <li>Verás los detalles completos de la cita</li>
              <li>Podrás modificar la información</li>
              <li>Cambiar el estado de la cita</li>
              <li>Eliminar la cita si es necesario</li>
            </ul>
          </div>

          <div className="help-section">
            <h6>🎨 Código de colores:</h6>
            <ul>
              <li><span className="text-success">Verde</span>: Citas confirmadas</li>
              <li><span className="text-warning">Amarillo</span>: Citas pendientes</li>
              <li><span className="text-danger">Rojo</span>: Citas canceladas</li>
              <li><span className="text-primary">Azul</span>: Citas completadas</li>
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CalendarHelp;