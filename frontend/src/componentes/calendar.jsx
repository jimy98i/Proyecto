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
      showHelp: false,
      isMobile: window.innerWidth <= 768
    }
  }

  componentDidMount() {
    this.loadEvents();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth <= 768 });
  }

  loadEvents = async () => {
    try {
      const events = await fetchAppointments();
      if (events && events.length > 0) {
        const formattedEvents = events.map(event => ({
          id: event.id,
          title: event.title || event.tipo_cita || 'Sin título',
          start: event.start,
          end: event.end,
          status: event.status || event.estado || 'programada',
          backgroundColor: getStatusColor(event.status || event.estado),
          borderColor: getStatusColor(event.status || event.estado),
          extendedProps: {
            ...event,
            status: event.status || event.estado || 'programada',
            user_id: event.user_id || '',
            notas: event.notas || event.descripcion || '',
          }
        }));
        console.log('Eventos formateados:', formattedEvents);
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

  openModal = (action, eventData = {}) => {
    // console.log('Abriendo modal con datos:', eventData);
    this.setState({
      isModalOpen: true,
      modalData: eventData,
      modalAction: action
    });
  };

  closeModal = () => {
    this.setState({ 
      isModalOpen: false, 
      modalAction: null,
      modalData: { title: '', start: '', end: '', allDay: false }
    });
  };

  handleDateSelect = (selectInfo) => {
        // Obtener la fecha actual sin la hora
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Convertir la fecha seleccionada a objeto Date
        const selectedDate = new Date(selectInfo.startStr);
        selectedDate.setHours(0, 0, 0, 0);
        
        // Comparar las fechas
        if (selectedDate < today) {
            alert('No puedes seleccionar una fecha anterior a hoy');
            return;
        }
    
        const eventData = {
            fecha_cita: selectInfo.startStr.split('T')[0],
            hora_cita: selectInfo.startStr.split('T')[1]?.substring(0, 5) || '',
            tipo_cita: '',
            estado: 'programada',
            user_id: localStorage.getItem('userId'),
            notas: ''
        };
        
        this.openModal('create', eventData);
  };

  handleEventClick = (info) => {
    const eventData = {
      id: info.event.id,
      title: info.event.title,
      fecha_cita: info.event.startStr.split('T')[0],
      hora_cita: info.event.startStr.split('T')[1]?.substring(0, 5) || '',
      tipo_cita: info.event.extendedProps.tipo_cita || info.event.title || '',
      estado: info.event.extendedProps.status || info.event.extendedProps.estado || 'programada',
      notas: info.event.extendedProps.notas || info.event.extendedProps.descripcion || '',
      // Añadimos la mascota asociada si existe en los extendedProps
      mascota_id: info.event.extendedProps?.historial?.mascota?.id || '',
      // Si tienes la línea de historial, también pásala
      linea_historial_id: info.event.extendedProps?.historial?.id || '',
      user_id: info.event.extendedProps.user_id || '',
    };
    this.openModal('edit', eventData);
  };

  handleModalSubmit = async (formData) => {
    try {
      if (this.state.modalAction === 'create') {
        const response = await post('/appointment', formData);
        if (response.error) {
          throw new Error(response.error || 'Error al añadir el evento');
        }
        await this.loadEvents();
      } else if (this.state.modalAction === 'edit') {
        const response = await put(`/appointment/${formData.id}`, formData);
        if (response.error) {
          throw new Error(response.error || 'Error al actualizar el evento');
        }
        await this.loadEvents();
      }
      this.closeModal();
    } catch (error) {
      console.error('Error en la operación:', error);
      // this.setState({ error: error.message });
    }
  };

  handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await del(`/appointment/${appointmentId}`);
      if (!response.ok) {
        throw new Error('Error al eliminar la cita');
      }
      await this.loadEvents();
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      throw error;
    }
  };

  render() {
    const isAdmin = localStorage.getItem('userRole') === 'admin';
    const { isMobile } = this.state;
    
    return (
      <div className='demo-app'>
        {!isMobile && this.renderSidebar()}
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
                  left: isMobile ? 'prev,next' : 'prev,next today',
                  center: 'title',
                  right: isAdmin 
                    ? (isMobile ? 'dayGridMonth,timeGridDay' : 'dayGridMonth,timeGridWeek,timeGridDay')
                    : (isMobile ? 'timeGridDay' : 'timeGridWeek')
                }}
                initialView={isMobile ? 'timeGridDay' : (isAdmin ? 'dayGridMonth' : 'timeGridWeek')}
                editable={true}
                allDaySlot={false}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={!isMobile}
                weekends={this.state.weekendsVisible}
                events={this.state.currentEvents}
                select={this.handleDateSelect}
                eventClick={this.handleEventClick}
                eventChange={this.handleEventChange}
                eventDisplay="block"
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                }}
                height={isMobile ? 'auto' : 'auto'}
                contentHeight={isMobile ? 'auto' : 'auto'}
                aspectRatio={isMobile ? 1.35 : 1.5}
                expandRows={isMobile}
                stickyHeaderDates={true}
                nowIndicator={true}
                slotMinTime="09:00:00"
                slotMaxTime="21:00:00"
                slotDuration="00:30:00"
                slotLabelInterval="01:00"
                slotLabelFormat={{
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
    const { isMobile } = this.state;

    if (userRole !== 'admin' || isMobile) {
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
            {this.state.currentEvents.map(event => {
              const status = event.status || event.extendedProps?.status || 'programada';
              // console.log('Renderizando evento:', { id: event.id, title: event.title, status });
              return (
                <li key={event.id} className="mb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <b>{formatDate(event.start, { month: '2-digit', day: '2-digit', year: 'numeric' })}</b>
                      <br />
                      <i>{event.title}</i>
                    </div>
                    <Badge bg={getStatusColor(status)}>
                      {status}
                    </Badge>
                  </div>
                </li>
              );
            })}
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
      end: changeInfo.event.endStr,
      allDay: changeInfo.event.allDay
    };

    try {
      const response = await put(`/appointment/${updatedEvent.id}`, updatedEvent);
      if (!response.ok) {
        throw new Error('Error al actualizar el evento');
      }
      await this.loadEvents();
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
    }
  };

}