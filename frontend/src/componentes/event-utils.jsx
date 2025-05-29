import { get } from '../utils/api';

export const fetchAppointments = async () => {
    try {
        const response = await get('/appointment');
        
        // Obtener el JSON de la respuesta
        const appointments = await response.json();
        console.log('Citas obtenidas:', appointments);
        // Asegurarnos de que appointments es un array
        if (!Array.isArray(appointments)) {
            console.error('La respuesta no es un array:', appointments);
            return [];
        }

        const mappedAppointments = appointments.map(appointment => {
            const event = {
                id: appointment.id,
                title: appointment.title || 'Pendiente',
                start: `${appointment.start}`,
                end: null,
                allDay: false,
                status: appointment.status,
                notas: appointment.notas,
                cliente: appointment.cliente,
                historial: appointment.historial,
                user_id: appointment.user_id || null,
            };
            console.log('Evento mapeado:', event);
            return event;
        });

        return mappedAppointments;
    } catch (error) {
        return [];
    }
};

export const fetchUpcomingAppointments = async () => {
    try {
        const response = await get('/appointment/upcoming');
        const data = response.data;
        
        return data.map(appointment => ({
            id: appointment.id,
            title: appointment.title || 'Sin título',
            start: appointment.start,
            end: appointment.start,
            allDay: false,
            status: appointment.status,
            notas: appointment.notas,
            ...(appointment.cliente && {
                cliente: {
                    id: appointment.cliente.id,
                    nombre: appointment.cliente.nombre,
                    email: appointment.cliente.email
                }
            }),
            ...(appointment.historial && {
                historial: {
                    id: appointment.historial.id,
                    descripcion: appointment.historial.descripcion,
                    fecha: appointment.historial.fecha,
                    mascota: appointment.historial.mascota
                }
            })
        }));
    } catch (error) {
        return [];
    }
};

export const fetchPastAppointments = async () => {
    try {
        const response = await get('/appointment/past');
        const data = response.data;
        
        return data.map(appointment => ({
            id: appointment.id,
            title: appointment.title || 'Sin título',
            start: appointment.start,
            end: appointment.start,
            allDay: false,
            status: appointment.status,
            notas: appointment.notas,
            ...(appointment.cliente && {
                cliente: {
                    id: appointment.cliente.id,
                    nombre: appointment.cliente.nombre,
                    email: appointment.cliente.email
                }
            }),
            ...(appointment.historial && {
                historial: {
                    id: appointment.historial.id,
                    descripcion: appointment.historial.descripcion,
                    fecha: appointment.historial.fecha,
                    mascota: appointment.historial.mascota
                }
            })
        }));
    } catch (error) {
        return [];
    }
};

export const fetchAppointmentsByStatus = async (status) => {
    try {
        const response = await get(`/appointment/status/${status}`);
        const data = response.data;
        
        return data.map(appointment => ({
            id: appointment.id,
            title: appointment.title || 'Sin título',
            start: appointment.start,
            end: null,
            allDay: false,
            status: appointment.status,
            notas: appointment.notas,
            ...(appointment.cliente && {
                cliente: {
                    id: appointment.cliente.id,
                    nombre: appointment.cliente.nombre,
                    email: appointment.cliente.email
                }
            }),
            ...(appointment.historial && {
                historial: {
                    id: appointment.historial.id,
                    descripcion: appointment.historial.descripcion,
                    fecha: appointment.historial.fecha,
                    mascota: appointment.historial.mascota
                }
            })
        }));
    } catch (error) {
        return [];
    }
};

export const fetchAppointmentsByType = async (type) => {
    try {
        const response = await get(`/appointment/type/${type}`);
        const data = response.data;
  
        return data.map(appointment => ({
            id: appointment.id,
            title: appointment.title || 'Sin título',
            start: appointment.start,
            end: appointment.start,
            allDay: false,
            status: appointment.status,
            notas: appointment.notas,
            ...(appointment.cliente && {
                cliente: {
                    id: appointment.cliente.id,
                    nombre: appointment.cliente.nombre,
                    email: appointment.cliente.email
                }
            }),
            ...(appointment.historial && {
                historial: {
                    id: appointment.historial.id,
                    descripcion: appointment.historial.descripcion,
                    fecha: appointment.historial.fecha,
                    mascota: appointment.historial.mascota
                }
            })
        }));
    } catch (error) {
        return [];
    }
};
