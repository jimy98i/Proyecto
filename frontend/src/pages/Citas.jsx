import React, { useState } from 'react';
import Calendar from '../componentes/calendar';
import { Button } from 'react-bootstrap';
import { FaFileExcel, FaFilePdf, FaFileCsv } from 'react-icons/fa';
import '../css/Citas.css';

const API_URL = import.meta.env.VITE_API_URL;

const Citas = () => {
    const userRole = localStorage.getItem('userRole');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleDeleteAppointment = async (appointmentId) => {
        try {
            const response = await fetch(`${API_URL}/api/appointment/${appointmentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la cita');
            }

            // Actualizar el calendario después de eliminar
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error('Error al eliminar la cita:', error);
            alert('Error al eliminar la cita. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className="citas-section">
            <h1>Gestión de Citas</h1>
            
            {userRole === 'admin' ? (
                <div className="admin-info">
                    <p>Panel de administración de citas.</p>
                </div>
            ) : (
                <div className="client-info">
                    <p>Bienvenido a tu panel de citas. Aquí puedes:</p>
                    <ul>
                        <li>Ver tus citas programadas</li>
                        <li>Solicitar nuevas citas</li>
                        <li>Modificar o cancelar citas existentes</li>
                        <li>Ver el historial de tus citas</li>
                    </ul>
                </div>
            )}

            <div className="calendar-container">
                <Calendar 
                    refreshTrigger={refreshTrigger}
                    onDeleteAppointment={handleDeleteAppointment}
                />
            </div>
        </div>
    );
};

export default Citas;