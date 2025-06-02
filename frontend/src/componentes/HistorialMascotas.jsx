import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { get } from '../utils/api';

const HistorialMascotas = () => {
    const { userId } = useAuth();
    const [mascotas, setMascotas] = useState([]);
    const [historiales, setHistoriales] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Obtener mascotas del cliente
                const responseMascotas = await get(`/pet/client/${userId}`);
                if (responseMascotas.error) throw new Error('Error al cargar las mascotas');
                setMascotas(responseMascotas);

                // Obtener historiales para cada mascota
                const historialesData = {};
                for (const mascota of responseMascotas) {
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
        };

        cargarDatos();
    }, [userId]);

    if (loading) return <div className="text-center p-4">Cargando...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Historial de Mascotas</h2>
            
            {mascotas.map(mascota => (
                <div key={mascota.id} className="mb-8 bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">{mascota.nombre}</h3>
                        <span className="text-gray-600">{mascota.tipo}</span>
                    </div>

                    {historiales[mascota.id] && historiales[mascota.id].history_lines && historiales[mascota.id].history_lines.length > 0 ? (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium mb-3">Historial Clínico</h4>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Fecha</th>
                                            <th className="px-4 py-2 text-left">Descripción</th>
                                            <th className="px-4 py-2 text-left">Diagnóstico</th>
                                            <th className="px-4 py-2 text-left">Tratamiento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historiales[mascota.id].history_lines.map(linea => (
                                            <tr key={linea.id} className="border-b">
                                                <td className="px-4 py-2">
                                                    {new Date(linea.fecha).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-2">{linea.descripcion}</td>
                                                <td className="px-4 py-2">{linea.diagnostico}</td>
                                                <td className="px-4 py-2">{linea.tratamiento}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <p className="text-muted text-center">No hay historial disponible</p>
                    )}
                </div>
            ))}

            {mascotas.length === 0 && (
                <div className="text-center text-gray-500">
                    No tienes mascotas registradas
                </div>
            )}
        </div>
    );
};

export default HistorialMascotas;