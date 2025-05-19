<?php

namespace App\Services;

use App\Models\HistoryLine;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class HistoryLineService
{
    public function __construct(protected HistoryLine $historyLine)
    {
    }

    public function getAll(): Collection
    {
        return HistoryLine::with('history')->get();
    }

    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return HistoryLine::with('history')->paginate($perPage);
    }

    public function findById(int $id): ?HistoryLine
    {
        return HistoryLine::with('history')->find($id);
    }

    public function create(array $data): HistoryLine
    {
        return HistoryLine::create($data);
    }

    public function update(HistoryLine $historyLine, array $data): bool
    {
        return $historyLine->update($data);
    }

    public function delete(HistoryLine $historyLine): bool
    {
        return $historyLine->delete();
    }

    public function getHistoryLinesByHistory(int $historyId): Collection
    {
        return HistoryLine::where('historial_id', $historyId)->with('history')->get();
    }

    public function getActiveHistoryLines(): Collection
    {
        return $this->historyLine->where('estado', 'activo')
            ->with(['history', 'treatments', 'appointments'])
            ->get();
    }

    public function getCompletedHistoryLines(): Collection
    {
        return $this->historyLine->where('estado', 'completado')
            ->with(['history', 'treatments', 'appointments'])
            ->get();
    }

    public function getHistoryLinesWithTreatments(int $historyId): Collection
    {
        return $this->historyLine->with('treatments')
            ->where('historial_id', $historyId)
            ->get();
    }

    public function getHistoryLinesWithAppointments(int $historyId): Collection
    {
        return $this->historyLine->with('appointments')
            ->where('historial_id', $historyId)
            ->get();
    }
}