<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\HistoryLine;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Http\Exceptions\HttpResponseException;

class AppointmentService
{
    public function getAll(): Collection
    {
        return Appointment::with([
            'user:id,nombre,email',
            'historyLine.history.pet:id,nombre,tipo'
        ])->get();
    }

    public function getClientAppointments(): Collection
    {
        $userId = Auth::id();
        
        return Appointment::where('user_id', $userId)
            ->select([
                'id',
                'tipo_cita',
                'fecha_cita',
                'hora_cita',
                'estado',
                'notas'
            ])
            ->get();
    }

    public function getClientUpcomingAppointments(): Collection
    {
        $userId = Auth::id();
        
        return Appointment::where('user_id', $userId)
            ->where('fecha_cita', '>=', now())
            ->where('estado', '!=', 'cancelada')
            ->select([
                'id',
                'tipo_cita',
                'fecha_cita',
                'hora_cita',
                'estado',
                'notas'
            ])
            ->orderBy('fecha_cita')
            ->orderBy('hora_cita')
            ->get();
    }

    public function getClientPastAppointments(): Collection
    {
        $userId = Auth::id();
        
        return Appointment::where('user_id', $userId)
            ->where('fecha_cita', '<', now())
            ->select([
                'id',
                'tipo_cita',
                'fecha_cita',
                'hora_cita',
                'estado',
                'notas'
            ])
            ->orderBy('fecha_cita', 'desc')
            ->orderBy('hora_cita', 'desc')
            ->get();
    }

    public function getUpcomingAppointments(): Collection
    {
        return Appointment::where('fecha_cita', '>=', now())
            ->where('estado', '!=', 'cancelada')
            ->with([
                'user:id,nombre,email',
                'historyLine.history.pet:id,nombre,tipo'
            ])
            ->orderBy('fecha_cita')
            ->orderBy('hora_cita')
            ->get();
    }

    public function getPastAppointments(): Collection
    {
        return Appointment::where('fecha_cita', '<', now())
            ->with([
                'user:id,nombre,email',
                'historyLine.history.pet:id,nombre,tipo'
            ])
            ->orderBy('fecha_cita', 'desc')
            ->orderBy('hora_cita', 'desc')
            ->get();
    }

    public function getAppointmentsByStatus(string $status): Collection
    {
        return Appointment::where('estado', $status)
            ->with([
                'user:id,nombre,email',
                'historyLine.history.pet:id,nombre,tipo'
            ])
            ->get();
    }

    public function getAppointmentsByType(string $type): Collection
    {
        return Appointment::where('tipo_cita', $type)
            ->with([
                'user:id,nombre,email',
                'historyLine.history.pet:id,nombre,tipo'
            ])
            ->get();
    }

    public function findById(int $id): ?Appointment
    {
        return Appointment::with([
            'user:id,nombre,email',
            'historyLine.history.pet:id,nombre,tipo'
        ])->find($id);
    }

    public function create(array $data): Appointment
    {
        $data['linea_historial_id'] = $data['linea_historial_id'] ?? null;
        $this->validateHistoryLine($data);
        // dd($data);
        return Appointment::create($data);
    }

    public function update(Appointment $appointment, array $data): bool
    {
        $this->validateHistoryLine($data);
        return $appointment->update($data);
    }

    public function delete(Appointment $appointment): bool
    {
        return $appointment->delete();
    }

    public function getAppointmentsByHistoryLine(int $historyLineId): Collection
    {
        return Appointment::where('linea_historial_id', $historyLineId)
            ->with([
                'user:id,nombre,email',
                'historyLine.history.pet:id,nombre,tipo'
            ])
            ->get();
    }

    public function searchHistoryLines(string $query): Collection
    {
        return HistoryLine::where('descripcion', 'like', "%{$query}%")
            ->with(['history.pet', 'history.pet.client'])
            ->get()
            ->map(function ($historyLine) {
                return [
                    'id' => $historyLine->id,
                    'descripcion' => $historyLine->descripcion,
                    'fecha' => $historyLine->fecha->format('Y-m-d'),
                    'estado' => $historyLine->estado,
                    'mascota' => [
                        'id' => $historyLine->history->pet->id,
                        'nombre' => $historyLine->history->pet->nombre,
                        'tipo' => $historyLine->history->pet->tipo,
                        'cliente' => [
                            'id' => $historyLine->history->pet->client->id,
                            'nombre' => $historyLine->history->pet->client->nombre
                        ]
                    ]
                ];
            });
    }

    public function assignHistoryLine(int $appointmentId, int $historyLineId): Appointment
    {
        $appointment = $this->findById($appointmentId);
        $appointment->linea_historial_id = $historyLineId;
        $appointment->save();
        return $appointment->load(['historyLine.history.pet', 'historyLine.history.pet.client']);
    }

    public function unassignHistoryLine(int $appointmentId): Appointment
    {
        $appointment = $this->findById($appointmentId);
        $appointment->linea_historial_id = null;
        $appointment->save();
        return $appointment;
    }

    /**
     * Valida la línea de historial si está presente en los datos
     * 
     * @param array $data
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function validateHistoryLine(array $data): void
    {
        // Si no existe linea_historial_id o está vacío, no validamos
        if (!isset($data['linea_historial_id']) || $data['linea_historial_id'] == null) {
            return;
        }

        $historyLine = HistoryLine::where('id', $data['linea_historial_id'])->first();
        if (!$historyLine) {
            throw new HttpResponseException(
                response()->json([
                    'message' => 'La línea de historial especificada no existe'
                ], 404)
            );
        }

        $history = $historyLine->history;
        if (!$history || !$history->pet) {
            throw new HttpResponseException(
                response()->json([
                    'message' => 'La línea de historial no está asociada a ninguna mascota'
                ], 400)
            );
        }
    }
} 