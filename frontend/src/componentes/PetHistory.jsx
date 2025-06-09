import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { get } from '../utils/api';
import { useAuth } from '../auth/AuthContext';
import './PetHistory.css';

const PetHistory = () => {
    const { userId } = useAuth();
    const [mascotas, setMascotas] = useState([]);
    const [historiales, setHistoriales] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarHistorial = async () => {
            if (userId) {
                setLoading(true);
                try {
                    // Obtener mascotas del cliente
                    const responseMascotas = await get(`/pet/client/${localStorage.getItem('userName')}`);
                    if (responseMascotas.error) throw new Error('Error al cargar las mascotas');
                    setMascotas(responseMascotas);

                    // Obtener historiales para cada mascota
                    const historialesData = {};
                    for (const mascota of responseMascotas) {
                        // Primero obtenemos el historial de la mascota
                        const responseHistorial = await get(`/history/${mascota.id}`);
                        if (responseHistorial.error) {
                            continue;
                        }
                        // Obtener las líneas del historial
                        const responseLines = await get(`/historyline/${responseHistorial.id}`);
                        const history_lines = Array.isArray(responseLines) ? responseLines : [];
                        historialesData[mascota.id] = {
                            ...responseHistorial,
                            history_lines
                        };
                    }
                    setHistoriales(historialesData);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        cargarHistorial();
    }, [userId]);

    // Vista tipo cards para móvil
    const isMobile = window.innerWidth <= 768;

    if (loading) return <div className="text-center p-4">Cargando...</div>;
    if (error) return <div className="text-danger p-4">{error}</div>;
    if (mascotas.length === 0) return <div className="text-center text-muted">No tienes mascotas registradas</div>;

    if (isMobile) {
        return mascotas.map(mascota => (
            <Card key={mascota.id} className="mb-4 pet-card">
                <Card.Header className="bg-light">
                    <h5 className="mb-0">
                        <FontAwesomeIcon icon={faPaw} className="me-2" />
                        {mascota.nombre} - {mascota.tipo}
                    </h5>
                </Card.Header>
                <Card.Body>
                    {historiales[mascota.id]?.history_lines && historiales[mascota.id].history_lines.length > 0 ? (
                        <>
                            <h6 className="mb-3">Historial Clínico</h6>
                            {historiales[mascota.id].history_lines.map(linea => (
                                <div key={linea.id} className="mb-2 p-2 border rounded bg-light">
                                    <div><strong>Fecha:</strong> {new Date(linea.fecha).toLocaleDateString()}</div>
                                    <div><strong>Descripción:</strong> {linea.descripcion}</div>
                                    <div><strong>Diagnóstico:</strong> {linea.diagnostico}</div>
                                    <div><strong>Tratamiento:</strong> {linea.tratamiento}</div>
                                </div>
                            ))}
                            {historiales[mascota.id].treatments && historiales[mascota.id].treatments.length > 0 && (
                                <>
                                    <h6 className="mb-3">Tratamientos</h6>
                                    {historiales[mascota.id].treatments.map(tratamiento => (
                                        <div key={tratamiento.id} className="mb-3 p-2 border rounded bg-light">
                                            <div className="mb-1">
                                                <strong>{tratamiento.descripcion}</strong> -
                                                <span className={`ms-2 badge ${getEstadoBadgeClass(tratamiento.estado)}`}>{tratamiento.estado}</span>
                                            </div>
                                            <div className="text-muted small mb-2">
                                                {new Date(tratamiento.fecha_inicio).toLocaleDateString()} - {new Date(tratamiento.fecha_fin).toLocaleDateString()}
                                            </div>
                                            {tratamiento.products && tratamiento.products.length > 0 && (
                                                <div>
                                                    <strong>Productos:</strong>
                                                    <ul className="mb-0">
                                                        {tratamiento.products.map(producto => (
                                                            <li key={producto.id}>{producto.nombre} (x{producto.pivot.cantidad})</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    ) : (
                        <p className="text-muted text-center">No hay historial disponible</p>
                    )}
                </Card.Body>
            </Card>
        ));
    }

    return mascotas.map(mascota => (
        <Card key={mascota.id} className="mb-4">
            <Card.Header className="bg-light">
                <h5 className="mb-0">
                    <FontAwesomeIcon icon={faPaw} className="me-2" />
                    {mascota.nombre} - {mascota.tipo}
                </h5>
            </Card.Header>
            <Card.Body>
                {historiales[mascota.id]?.history_lines ? (
                    <>
                        <h6 className="mb-3">Historial Clínico</h6>
                        <Table responsive hover className="mb-4 pet-history-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Descripción</th>
                                    <th>Diagnóstico</th>
                                    <th>Tratamiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historiales[mascota.id].history_lines.map(linea => (
                                    <tr key={linea.id}>
                                        <td>{new Date(linea.fecha).toLocaleDateString()}</td>
                                        <td>{linea.descripcion}</td>
                                        <td>{linea.diagnostico}</td>
                                        <td>{linea.tratamiento}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        
                        {historiales[mascota.id].treatments && historiales[mascota.id].treatments.length > 0 && (
                            <>
                                <h6 className="mb-3">Tratamientos</h6>
                                {historiales[mascota.id].treatments.map(tratamiento => (
                                    <div key={tratamiento.id} className="mb-4">
                                        <h6 className="text-muted mb-2">
                                            {tratamiento.descripcion} - 
                                            <span className={`ms-2 badge ${getEstadoBadgeClass(tratamiento.estado)}`}>
                                                {tratamiento.estado}
                                            </span>
                                        </h6>
                                        <p className="text-muted small mb-2">
                                            {new Date(tratamiento.fecha_inicio).toLocaleDateString()} - 
                                            {new Date(tratamiento.fecha_fin).toLocaleDateString()}
                                        </p>
                                        {tratamiento.products && tratamiento.products.length > 0 && (
                                            <Table responsive hover size="sm" className="pet-history-table">
                                                <thead>
                                                    <tr>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tratamiento.products.map(producto => (
                                                        <tr key={producto.id}>
                                                            <td>{producto.nombre}</td>
                                                            <td>{producto.pivot.cantidad}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                ) : (
                    <p className="text-muted text-center">No hay historial disponible</p>
                )}
            </Card.Body>
        </Card>
    ));
};

const getEstadoBadgeClass = (estado) => {
    switch (estado) {
        case 'activo':
            return 'bg-success';
        case 'completado':
            return 'bg-primary';
        case 'cancelado':
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
};

export default PetHistory;