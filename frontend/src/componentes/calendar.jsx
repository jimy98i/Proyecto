import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { fetchAppointments } from './event-utils'
import { formatDate } from '@fullcalendar/core';
import CalendarModal from './CalendarModal'
import CalendarHelp from './CalendarHelp'
import '../css/Calendar.css'
import { get, post, put, del } from '../utils/api';
import { Badge } from 'react-bootstrap';
import ExportButtons from './ExportButtons';


const getStatusColor = (status) => {
  switch (status) {
    case 'confirmada':
      return 'success';
    case 'cancelada':
      return 'danger';
    case 'programada':
      return 'warning';
    case 'completada':
      return 'info';
    default:
      return 'secondary';
  }
};

export default class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef(); // Inicializar la referencia para FullCalendar
    this.state = {
      weekendsVisible: false,
      currentEvents: [],
      isModalOpen: false, // Controla si el modal está abierto
      modalData: { title: '', start: '', end: '', allDay: false }, // Datos iniciales del modal
      modalAction: null, // Acción actual (crear, editar, etc.)
      pendingAppointments: [],
      showHelp: false
    }
  }

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents = async () => {
    try {
      const events = await fetchAppointments();
      if (events && events.length > 0) {
        const formattedEvents = events.map(event => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          backgroundColor: getStatusColor(event.status),
          borderColor: getStatusColor(event.status),
          extendedProps: {
            ...event
          }
        }));
        this.setState({ currentEvents: formattedEvents });
      }
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.refreshTrigger !== this.props.refreshTrigger) {
      this.loadEvents();
    }
  }

  openModal = (action, eventData = { id:'', linea_historial_id: '', fecha_cita: '', hora_cita: '', tipo_cita: '', estado: '', notas: '' }) => {
    console.log('Abriendo modal con datos:', eventData); // Depurar los datos que se pasan al modal
    this.setState({
      isModalOpen: true,
      modalData: eventData,
      modalAction: action
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalAction: null });
  };

  handleDateSelect = (selectInfo) => {
    this.openModal('create', {
      linea_historial_id: '',
      fecha_cita: selectInfo.startStr.split('T')[0], // Extraer solo la fecha
      hora_cita: '',
      tipo_cita: '',
      estado: 'programada', // Estado predeterminado
      notas: ''
    });
  };

  handleEventClick = (info) => {
    const eventData = info.event.extendedProps;
    this.setState({
      showModal: true,
      selectedEvent: eventData
    });
  };

  handleModalSubmit = async (formData) => {
    const { modalAction } = this.state;
    const calendarApi = this.calendarRef.current.getApi();
    console.log('Datos del formulario:', formData);

    try {
      if (modalAction === 'create') {
        const response = await post('/appointment', formData);
        if (!response.ok) {
          throw new Error('Error al añadir el evento');
        }
        const savedEvent = await response.json();
        calendarApi.addEvent({
          id: savedEvent.id,
          ...formData
        });
        this.closeModal();
        this.loadEvents();
      } else if (modalAction === 'edit') {
        const response = await put(`/appointment/${formData.id}`, formData);
        if (!response.ok) {
          throw new Error('Error al actualizar el evento');
        }
        this.closeModal();
        this.loadEvents();
      }
    } catch (error) {
      console.error('Error en la operación:', error);
    }
  };

  handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await del(`/appointment/${appointmentId}`);
      if (!response.ok) {
        throw new Error('Error al eliminar la cita');
      }

      const calendarApi = this.calendarRef.current.getApi();
      const event = calendarApi.getEventById(appointmentId);
      if (event) {
        event.remove();
      }
      
      this.loadEvents();
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      throw error;
    }
  };

  render() {
    const isAdmin = localStorage.getItem('userRole') === 'admin';
    
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <div className="calendar-container">
            <div className="calendar-controls">
              {isAdmin && (
                <div className="export-buttons">
                  <ExportButtons />
                </div>
              )}
            </div>
            <div className="calendar-wrapper">
              <FullCalendar
                ref={this.calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: isAdmin ? 'dayGridMonth,timeGridWeek,timeGridDay' : 'timeGridWeek'
                }}
                initialView={isAdmin ? 'dayGridMonth' : 'timeGridWeek'}
                editable={true}
                allDaySlot={false}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={this.state.weekendsVisible}
                events={this.state.currentEvents}
                select={this.handleDateSelect}
                eventClick={this.handleEventClick}
                eventsSet={this.handleEvents}
                eventChange={this.handleEventChange}
                eventDisplay="block"
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                }}
              />
            </div>
          </div>
        </div>

        <CalendarModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          onSubmit={this.handleModalSubmit}
          initialData={this.state.modalData}
          userRole={localStorage.getItem('userRole')}
          onDelete={this.handleDeleteAppointment}
        />

        <CalendarHelp
          show={this.state.showHelp}
          onHide={() => this.setState({ showHelp: false })}
        />
      </div>
    )
  }

  renderSidebar() {
    const userRole = localStorage.getItem('userRole');

    if (userRole !== 'admin') {
      return null;
    }

    return (
      <div className='app-sidebar'>
        <div className='app-sidebar-section'>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Todas las citas ({this.state.currentEvents.length})</h2>
            <button 
              className="help-button" 
              onClick={() => this.setState({ showHelp: true })}
              title="Ayuda"
            >
              <i className="bi bi-question-lg"></i>
            </button>
          </div>
          <ul>
            {this.state.currentEvents.map(event => (
              <li key={event.id} className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <b>{formatDate(event.start, { month: '2-digit', day: '2-digit', year: 'numeric' })}</b>
                    <br />
                    <i>{event.title}</i>
                  </div>
                  <Badge bg={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleEventChange = async (changeInfo) => {
    const updatedEvent = {
      id: changeInfo.event.id,
      title: changeInfo.event.title,
      start: changeInfo.event.startStr,
      allDay: changeInfo.event.allDay
    };

    try {
      const response = await put(`/appointment/${updatedEvent.id}`, updatedEvent);
      if (!response.ok) {
        throw new Error('Error al actualizar el evento');
      }
      this.loadEvents();
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
    }
  };

  handleEvents = (events) => {
    // Comparar los eventos actuales y nuevos de manera más segura
    const currentEventIds = this.state.currentEvents.map(event => event.id);
    const newEventIds = events.map(event => event.id);

    // Solo actualizar el estado si los eventos han cambiado
    if (currentEventIds.join(',') !== newEventIds.join(',')) {
      this.setState({ currentEvents: events });
    }
  };

}