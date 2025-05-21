import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { get } from '../utils/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuth } from '../auth/AuthContext';

const ExportButtons = () => {
    const { isAuthenticated, userRole } = useAuth();

    // Si no está autenticado o no es admin, no mostrar nada
    if (!isAuthenticated || userRole !== 'admin') {
        return null;
    }

    const companyInfo = {
        name: 'Veterinaria Happy Friends',
        address: 'Calle jacinto 2, Granada',
        phone: '123-456-789',
        email: 'contacto@veterinariahappyfriends.com',
        website: 'www.veterinariahappyfriends.com'
    };

    const getCurrentMonthData = async () => {
        try {
            const response = await get('/appointment');
            
            if (!(response instanceof Response)) {
                throw new Error('La respuesta no es un objeto Response válido');
            }

            const appointments = await response.json();

            if (!Array.isArray(appointments)) {
                return [];
            }

            return appointments.map(appointment => ({
                ID: appointment.id,
                Tipo: appointment.title || 'Pendiente',
                Fecha: appointment.start,
                Estado: appointment.status,
                Notas: appointment.notas || '',
                Cliente: appointment.cliente ? appointment.cliente.nombre : 'No especificado',
                Historial: appointment.historial ? appointment.historial.descripcion : 'No especificado'
            }));
        } catch (error) {
            return [];
        }
    };

    const exportToExcel = async () => {
        try {
            const data = await getCurrentMonthData();
            if (data.length === 0) {
                alert('No hay datos para exportar');
                return;
            }

            const wb = XLSX.utils.book_new();
            
            // Añadir información de la empresa
            const headerData = [
                ['VETERINARIA Happy Friends'],
                ['Reporte de Citas'],
                [''],
                ['Datos de Contacto:'],
                [`Dirección: ${companyInfo.address}`],
                [`Teléfono: ${companyInfo.phone}`],
                [`Email: ${companyInfo.email}`],
                [`Web: ${companyInfo.website}`],
                [''],
                ['Fecha de generación: ' + new Date().toLocaleDateString()],
                [''],
                ['© ' + new Date().getFullYear() + ' Veterinaria Mascotas. Todos los derechos reservados.']
            ];

            const headerWs = XLSX.utils.aoa_to_sheet(headerData);
            XLSX.utils.book_append_sheet(wb, headerWs, 'Información');

            const ws = XLSX.utils.json_to_sheet(data, { origin: 'A1' });
            XLSX.utils.book_append_sheet(wb, ws, 'Citas');

            const footerWs = XLSX.utils.aoa_to_sheet([
                [''],
                ['© ' + new Date().getFullYear() + ' Veterinaria Mascotas. Todos los derechos reservados.']
            ]);
            XLSX.utils.book_append_sheet(wb, footerWs, 'Pie de página');

            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(dataBlob, 'citas.xlsx');
        } catch (error) {
            console.error('Error al exportar a Excel:', error);
            alert('Error al exportar a Excel');
        }
    };

    const exportToCSV = async () => {
        try {
            const data = await getCurrentMonthData();
            if (data.length === 0) {
                alert('No hay datos para exportar');
                return;
            }

            const header = [
                'VETERINARIA Happy Friends',
                'Reporte de Citas',
                '',
                'Datos de Contacto:',
                `Dirección: ${companyInfo.address}`,
                `Teléfono: ${companyInfo.phone}`,
                `Email: ${companyInfo.email}`,
                `Web: ${companyInfo.website}`,
                '',
                `Fecha de generación: ${new Date().toLocaleDateString()}`,
                ''
            ].join('\n');

            const headers = Object.keys(data[0]);
            const csvContent = [
                headers.join(','),
                ...data.map(row => headers.map(header => row[header]).join(','))
            ].join('\n');

            const footer = [
                '',
                `© ${new Date().getFullYear()} Veterinaria Mascotas. Todos los derechos reservados.`
            ].join('\n');

            const finalContent = [header, csvContent, footer].join('\n');

            const blob = new Blob([finalContent], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, 'citas.csv');
        } catch (error) {
            alert('Error al exportar a CSV');
        }
    };

    const exportToPDF = async () => {
        try {
            const data = await getCurrentMonthData();
            if (data.length === 0) {
                alert('No hay datos para exportar');
                return;
            }

            const doc = new jsPDF();
            
            doc.setFontSize(20);
            doc.text('VETERINARIA Happy Friends', 14, 20);
            
            doc.setFontSize(12);
            doc.text('Reporte de Citas', 14, 30);
            
            doc.setFontSize(10);
            doc.text('Datos de Contacto:', 14, 40);
            doc.text(`Dirección: ${companyInfo.address}`, 14, 45);
            doc.text(`Teléfono: ${companyInfo.phone}`, 14, 50);
            doc.text(`Email: ${companyInfo.email}`, 14, 55);
            doc.text(`Web: ${companyInfo.website}`, 14, 60);
            
            doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 70);

            autoTable(doc, {
                head: [Object.keys(data[0])],
                body: data.map(row => Object.values(row)),
                startY: 80,
                theme: 'grid',
                styles: {
                    fontSize: 8,
                    cellPadding: 2
                },
                headStyles: {
                    fillColor: [41, 128, 185],
                    textColor: 255
                },
                didDrawPage: function(data) {
                    doc.setFontSize(8);
                    doc.text(
                        `© ${new Date().getFullYear()} Veterinaria Mascotas. Todos los derechos reservados.`,
                        data.settings.margin.left,
                        doc.internal.pageSize.height - 10
                    );
                }
            });

            doc.save('citas.pdf');
        } catch (error) {
            alert('Error al exportar a PDF');
        }
    };

    return (
        <div className="export-buttons" style={{ justifyContent: 'flex-end' }}>
            <ButtonGroup>
                <Button 
                    variant="outline-success" 
                    onClick={exportToExcel}
                    style={{ borderColor: '#198754', color: '#198754' }}
                >
                    <i className="bi bi-file-earmark-excel me-2"></i>
                    Excel
                </Button>
                <Button 
                    variant="outline-primary" 
                    onClick={exportToCSV}
                    style={{ borderColor: '#0d6efd', color: '#0d6efd' }}
                >
                    <i className="bi bi-file-earmark-text me-2"></i>
                    CSV
                </Button>
                <Button 
                    variant="outline-danger" 
                    onClick={exportToPDF}
                    style={{ borderColor: '#dc3545', color: '#dc3545' }}
                >
                    <i className="bi bi-file-earmark-pdf me-2"></i>
                    PDF
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default ExportButtons; 