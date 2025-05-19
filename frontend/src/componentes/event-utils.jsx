const API_URL = import.meta.env.VITE_API_URL;

export async function fetchAppointments() {
    try {
        const response = await fetch(`${API_URL}/appointment`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Procesar los datos para evitar referencias circulares
        return data.map(appointment => ({
            id: appointment.id,
            title: appointment.title || 'Sin título',
            start: appointment.start,
            end: appointment.end || null,
            allDay: appointment.allDay || false
        }));
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return [];
    }
}
