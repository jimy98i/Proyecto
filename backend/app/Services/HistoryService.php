<?php

namespace App\Services;

use App\Models\History;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class HistoryService
{
    public function __construct(protected History $history)
    {
    }

    public function getAll(): Collection
    {
        return $this->history->with(['pet', 'historyLines', 'appointments', 'documents'])->get();
    }

    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return $this->history->with(['pet', 'historyLines', 'appointments', 'documents'])->paginate($perPage);
    }

    public function findById(int $id): ?History
    {
        return $this->history->with(['pet', 'historyLines', 'appointments', 'documents'])->find($id);
    }

    public function create(array $data): History
    {
        return $this->history->create($data);
    }

    public function update(History $history, array $data): bool
    {
        return $history->update($data);
    }

    public function delete(History $history): bool
    {
        return $history->delete();
    }

    public function getHistoryByPet(int $petId): ?History
    {
        return $this->history->where('mascota_id', $petId)->first();
    }

    public function getHistoryWithLines(int $id): ?History
    {
        return $this->history->with('historyLines')->find($id);
    }

    public function getHistoryWithDocuments(int $id): ?History
    {
        return $this->history->with('documents')->find($id);
    }

    public function getHistoryWithAppointments(int $id): ?History
    {
        return $this->history->with('appointments')->find($id);
    }
} 