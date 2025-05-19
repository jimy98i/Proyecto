import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { fetchAppointments } from './event-utils'
import { formatDate } from '@fullcalendar/core';
import CalendarModal from './CalendarModal'
import '../css/Calendar.css'

const API_URL = import.meta.env.VITE_API_URL;

export default class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef(); // Inicializar la referencia para FullCalendar
  }

  state = {
    weekendsVisible: false,
    currentEvents: [],
    isModalOpen: false, // Controla si el modal está abierto
    modalData: { title: '', start: '', end: '', allDay: false }, // Datos iniciales del modal
    modalAction: null, // Acción actual (crear, editar, etc.)
  }

  async fetchEvents() {
    try {
      const events = await fetchAppointments(); // Llamar a la función fetchAppointments
      console.log('Eventos cargados:', events); // Depurar los eventos cargados
      this.setState({ currentEvents: events }); // Actualizar el estado con los eventos cargados
    } catch (error) {
      console.error('Error al cargar los eventos:', error);
    }
  }

  componentDidMount() {
    this.fetchEvents(); // Llamar a la función fetchEvents al montar el componente
  }

  componentDidUpdate(prevProps) {
    if (prevProps.refreshTrigger !== this.props.refreshTrigger) {
      this.fetchEvents();
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

  handleEventClick = async (clickInfo) => {
    try {
      const response = await fetch(`${API_URL}/appointment/${clickInfo.event.id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener los datos de la cita');
      }

      const eventData = await response.json();
      console.log('Datos de la cita obtenidos del backend:', eventData);

      this.openModal('edit', {
        id: eventData.id || '',
        linea_historial_id: eventData.linea_historial_id || null,
        fecha_cita: eventData.fecha_cita || '',
        hora_cita: eventData.hora_cita || '',
        tipo_cita: eventData.tipo_cita || '',
        estado: eventData.estado || '',
        notas: eventData.notas || ''
      });
    } catch (error) {
      console.error('Error al cargar los datos de la cita:', error);
    }
  };

  handleModalSubmit = (formData) => {
    const { modalAction } = this.state;
    const calendarApi = this.calendarRef.current.getApi();
    console.log('Datos del formulario:', formData);

    if (modalAction === 'create') {
      fetch(`${API_URL}/appointment`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al añadir el evento');
          }
          return response.json();
        })
        .then(savedEvent => {
          calendarApi.addEvent({
            id: savedEvent.id,
            ...formData
          });
          this.closeModal();
          this.fetchEvents();
        })
        .catch(error => {
          console.error('Error al añadir el evento:', error);
        });
    } else if (modalAction === 'edit') {
      fetch(`${API_URL}/appointment/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al actualizar el evento');
          }
          this.closeModal();
          this.fetchEvents();
        })
        .catch(error => {
          console.error('Error al actualizar el evento:', error);
        });
    }
  };

  handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`${API_URL}/appointment/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la cita');
      }

      const calendarApi = this.calendarRef.current.getApi();
      const event = calendarApi.getEventById(appointmentId);
      if (event) {
        event.remove();
      }
      
      this.fetchEvents();
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      throw error;
    }
  };

  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            ref={this.calendarRef} // Asegurar que la referencia esté correctamente asignada
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: localStorage.getItem('userRole') === 'cliente' ? 'timeGridWeek' : 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView={localStorage.getItem('userRole') === 'cliente' ? 'timeGridWeek' : 'dayGridMonth'}
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
          />
        </div>

        <CalendarModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          onSubmit={this.handleModalSubmit}
          initialData={this.state.modalData}
          userRole={localStorage.getItem('userRole')}
          onDelete={this.handleDeleteAppointment}
        />
      </div>
    )
  }

  renderSidebar() {
    const userRole = localStorage.getItem('userRole'); // Obtener el rol del usuario desde localStorage

    if (userRole !== 'admin') {
      return null; // No mostrar la barra lateral si el usuario no es admin
    }

    return (
      <div className='app-sidebar'>
        <div className='app-sidebar-section'>
          <h2>Todas las citas ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
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

  handleEventChange = (changeInfo) => {
    const updatedEvent = {
      id: changeInfo.event.id,
      title: changeInfo.event.title,
      start: changeInfo.event.startStr,
      allDay: changeInfo.event.allDay
    };

    fetch(`${API_URL}/appointment/${updatedEvent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(updatedEvent)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el evento');
        }
        this.fetchEvents();
      })
      .catch(error => {
        console.error('Error al actualizar el evento:', error);
      });
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

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { month: '2-digit', day: '2-digit', year: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  )
}