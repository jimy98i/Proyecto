<?php

namespace App\Services;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class AppointmentService
{
    public function getAll(): Collection
    {
        return Appointment::with('historyLine')->get();
    }

    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return Appointment::with('historyLine')->paginate($perPage);
    }

    public function findById(int $id): ?Appointment
    {
        return Appointment::with('historyLine')->find($id);
    }

    public function create(array $data): Appointment
    {
        $this->validateHistoryLine($data);
        return Appointment::create($data);
    }

    public function update(Appointment $appointment, array $data): bool
    {
        // dd($appointment, $data);
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
            ->with('historyLine')
            ->get();
    }

    public function getUpcomingAppointments(): Collection
    {
        return Appointment::where('fecha_cita', '>=', now())
            ->where('estado', '!=', 'cancelada')
            ->with('historyLine')
            ->orderBy('fecha_cita')
            ->orderBy('hora_cita')
            ->get();
    }

    public function getPastAppointments(): Collection
    {
        return Appointment::where('fecha_cita', '<', now())
            ->with('historyLine')
            ->orderBy('fecha_cita', 'desc')
            ->orderBy('hora_cita', 'desc')
            ->get();
    }

    public function getAppointmentsByStatus(string $status): Collection
    {
        return Appointment::where('estado', $status)
            ->with('historyLine')
            ->get();
    }

    public function getAppointmentsByType(string $type): Collection
    {
        return Appointment::where('tipo_cita', $type)
            ->with('historyLine')
            ->get();
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

        $historyLine = \App\Models\HistoryLine::where('id', $data['linea_historial_id'])->first();
        if (!$historyLine) {
            throw new \Illuminate\Http\Exceptions\HttpResponseException(
                response()->json([
                    'message' => 'La línea de historial especificada no existe'
                ], 404)
            );
        }

        $history = $historyLine->history;
        if (!$history || !$history->pet) {
            throw new \Illuminate\Http\Exceptions\HttpResponseException(
                response()->json([
                    'message' => 'La línea de historial no está asociada a ninguna mascota'
                ], 400)
            );
        }
    }
} 