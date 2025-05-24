<?php

namespace App\Http\Controllers;

use App\Http\Requests\Appointment\StoreAppointmentRequest;
use App\Http\Requests\Appointment\UpdateAppointmentRequest;
use App\Models\Appointment;
use App\Services\AppointmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AppointmentController extends Controller
{
    protected AppointmentService $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    public function index(Request $request): JsonResponse
    {
        $userRole = Auth::user()->role;
        
        if ($userRole === 'cliente') {
            $appointments = $this->appointmentService->getClientAppointments();
            $formattedAppointments = $appointments->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'title' => $appointment->tipo_cita,
                    'start' => $appointment->fecha_cita->format('Y-m-d') . $appointment->hora_cita,
                    'status' => $appointment->estado,
                    'notas' => $appointment->notas
                ];
            });
        } else {
            $appointments = $this->appointmentService->getAll();
            $formattedAppointments = $appointments->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'title' => $appointment->tipo_cita,
                    'start' => date('Y-m-d', strtotime($appointment->fecha_cita)) . 'T' . date('H:i:s', strtotime($appointment->hora_cita)),
                    'status' => $appointment->estado,
                    'cliente' => $appointment->user ? [
                        'id' => $appointment->user->id,
                        'nombre' => $appointment->user->nombre,
                        'email' => $appointment->user->email
                    ] : null,
                    'historial' => $appointment->historyLine ? [
                        'id' => $appointment->historyLine->id,
                        'descripcion' => $appointment->historyLine->descripcion,
                        'fecha' => $appointment->historyLine->fecha->format('Y-m-d'),
                        'mascota' => $appointment->historyLine->history->pet ? [
                            'id' => $appointment->historyLine->history->pet->id,
                            'nombre' => $appointment->historyLine->history->pet->nombre,
                            'tipo' => $appointment->historyLine->history->pet->tipo
                        ] : null
                    ] : null
                ];
            });
        }

        return response()->json($formattedAppointments);
    }

    public function getUpcoming(): JsonResponse
    {
        $userRole = Auth::user()->role;
        
        if ($userRole === 'cliente') {
            $appointments = $this->appointmentService->getClientUpcomingAppointments();
            $formattedAppointments = $appointments->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'title' => $appointment->tipo_cita,
                    'start' => date('Y-m-d', strtotime($appointment->fecha_cita)) . 'T' . date('H:i:s', strtotime($appointment->hora_cita)),
                    'status' => $appointment->estado,
                    'notas' => $appointment->notas
                ];
            });
        } else {
            $appointments = $this->appointmentService->getUpcomingAppointments();
            $formattedAppointments = $appointments->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'title' => $appointment->tipo_cita,
                    'start' => date('Y-m-d', strtotime($appointment->fecha_cita)) . 'T' . date('H:i:s', strtotime($appointment->hora_cita)),
                    'status' => $appointment->estado,
                    'cliente' => $appointment->user ? [
                        'id' => $appointment->user->id,
                        'nombre' => $appointment->user->nombre,
                        'email' => $appointment->user->email
                    ] : null,
                    'historial' => $appointment->historyLine ? [
                        'id' => $appointment->historyLine->id,
                        'descripcion' => $appointment->historyLine->descripcion,
                        'fecha' => $appointment->historyLine->fecha->format('Y-m-d'),
                        'mascota' => $appointment->historyLine->history->pet ? [
                            'id' => $appointment->historyLine->history->pet->id,
                            'nombre' => $appointment->historyLine->history->pet->nombre,
                            'tipo' => $appointment->historyLine->history->pet->tipo
                        ] : null
                    ] : null
                ];
            });
        }

        return response()->json($formattedAppointments);
    }

    public function getPast(): JsonResponse
    {
        $userRole = Auth::user()->role;
        
        if ($userRole === 'cliente') {
            $appointments = $this->appointmentService->getClientPastAppointments();
            $formattedAppointments = $appointments->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'title' => $appointment->tipo_cita,
                    'start' => date('Y-m-d', strtotime($appointment->fecha_cita)) . 'T' . date('H:i:s', strtotime($appointment->hora_cita)),
                    'status' => $appointment->estado,
                    'notas' => $appointment->notas
                ];
            });
        } else {
            $appointments = $this->appointmentService->getPastAppointments();
            $formattedAppointments = $appointments->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'title' => $appointment->tipo_cita,
                    'start' => date('Y-m-d', strtotime($appointment->fecha_cita)) . 'T' . date('H:i:s', strtotime($appointment->hora_cita)),
                    'status' => $appointment->estado,
                    'cliente' => $appointment->user ? [
                        'id' => $appointment->user->id,
                        'nombre' => $appointment->user->nombre,
                        'email' => $appointment->user->email
                    ] : null,
                    'historial' => $appointment->historyLine ? [
                        'id' => $appointment->historyLine->id,
                        'descripcion' => $appointment->historyLine->descripcion,
                        'fecha' => $appointment->historyLine->fecha->format('Y-m-d'),
                        'mascota' => $appointment->historyLine->history->pet ? [
                            'id' => $appointment->historyLine->history->pet->id,
                            'nombre' => $appointment->historyLine->history->pet->nombre,
                            'tipo' => $appointment->historyLine->history->pet->tipo
                        ] : null
                    ] : null
                ];
            });
        }

        return response()->json($formattedAppointments);
    }

    public function store(StoreAppointmentRequest $request): JsonResponse
    {
        $appointment = $this->appointmentService->create($request->validated());
        return response()->json($appointment, 201);
    }

    public function show(Appointment $appointment): JsonResponse
    {
        $appointment = $this->appointmentService->findById($appointment->id);
        return response()->json($appointment);
    }

    public function update(UpdateAppointmentRequest $request, Appointment $appointment): JsonResponse
    {
        $this->appointmentService->update($appointment, $request->validated());
        return response()->json($appointment);
    }

    public function destroy(Appointment $appointment): JsonResponse
    {
        $this->appointmentService->delete($appointment);
        return response()->json(null, 204);
    }

    public function getByHistoryLine(int $historyLineId): JsonResponse
    {
        $appointments = $this->appointmentService->getAppointmentsByHistoryLine($historyLineId);
        return response()->json($appointments);
    }

    public function getByStatus(string $status): JsonResponse
    {
        $appointments = $this->appointmentService->getAppointmentsByStatus($status);
        return response()->json($appointments);
    }

    public function getByType(string $type): JsonResponse
    {
        $appointments = $this->appointmentService->getAppointmentsByType($type);
        return response()->json($appointments);
    }

    public function checkAvailability(Request $request): JsonResponse
    {
        try {
            Log::info('Iniciando verificación de disponibilidad', [
                'request_data' => $request->all(),
                'headers' => $request->headers->all()
            ]);

            $validated = $request->validate([
                'fecha_cita' => 'required|date',
                'hora_cita' => 'required|date_format:H:i',
            ]);

            Log::info('Datos validados', $validated);

            // Verificar si existe una cita en la misma fecha y hora
            $exists = Appointment::where('fecha_cita', $validated['fecha_cita'])
                ->where('hora_cita', $validated['hora_cita'])
                ->where('estado', '!=', 'cancelada')
                ->exists();

            // Obtener todas las citas del día para logging
            $citasDelDia = Appointment::where('fecha_cita', $validated['fecha_cita'])
                ->where('estado', '!=', 'cancelada')
                ->get();

            Log::info('Resultado de la verificación', [
                'fecha' => $validated['fecha_cita'],
                'hora' => $validated['hora_cita'],
                'existe' => $exists,
                'citas_del_dia' => $citasDelDia->pluck('hora_cita')
            ]);

            return response()->json([
                'available' => !$exists,
                'message' => $exists ? 'La hora seleccionada ya está ocupada' : 'La hora está disponible',
                'citas_del_dia' => $citasDelDia->pluck('hora_cita')
            ]);
        } catch (\Exception $e) {
            Log::error('Error en checkAvailability', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Error al verificar la disponibilidad',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function searchHistoryLines(Request $request): JsonResponse
    {
        $query = $request->input('query');
        $historyLines = $this->appointmentService->searchHistoryLines($query);
        return response()->json($historyLines);
    }

    public function assignHistoryLine(Request $request, Appointment $appointment): JsonResponse
    {
        $historyLineId = $request->input('history_line_id');
        $appointment = $this->appointmentService->assignHistoryLine($appointment->id, $historyLineId);
        return response()->json($appointment);
    }

    public function unassignHistoryLine(Appointment $appointment): JsonResponse
    {
        $appointment = $this->appointmentService->unassignHistoryLine($appointment->id);
        return response()->json($appointment);
    }
}