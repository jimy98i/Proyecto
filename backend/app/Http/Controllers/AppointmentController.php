<?php

namespace App\Http\Controllers;

use App\Http\Requests\Appointment\StoreAppointmentRequest;
use App\Http\Requests\Appointment\UpdateAppointmentRequest;
use App\Models\Appointment;
use App\Services\AppointmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Log;

class AppointmentController extends Controller
{
    protected AppointmentService $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    public function index(Request $request): JsonResponse
    {
        $appointments = $this->appointmentService->getAll();
        $formattedAppointments = $appointments->map(function ($appointment) {
            return [
                'id' => $appointment->id,
                'title' => $appointment->tipo_cita,
                'start' => date('Y-m-d', strtotime($appointment->fecha_cita)) . 'T' . date('H:i:s', strtotime($appointment->hora_cita)),
                'status' => $appointment->estado
            ];
        });

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
        // dd($request, $appointment);
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

    public function getUpcoming(): JsonResponse
    {
        $appointments = $this->appointmentService->getUpcomingAppointments();
        return response()->json($appointments);
    }

    public function getPast(): JsonResponse
    {
        $appointments = $this->appointmentService->getPastAppointments();
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
        $validated = $request->validate([
            'fecha_cita' => 'required|date',
            'hora_cita' => 'required|date_format:H:i',
        ]);

        $exists = Appointment::where('fecha_cita', $validated['fecha_cita'])
            ->where('hora_cita', $validated['hora_cita'])
            ->exists();
        return response()->json(['available' => !$exists]);
    }
}