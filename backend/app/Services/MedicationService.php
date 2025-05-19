<?php

namespace App\Services;

use App\Models\Medication;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class MedicationService
{
    public function getAll(): Collection
    {
        return Medication::all();
    }

    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return Medication::paginate($perPage);
    }

    public function findById(int $id): ?Medication
    {
        return Medication::find($id);
    }

    public function create(array $data): Medication
    {
        return Medication::create($data);
    }

    public function update(Medication $medication, array $data): bool
    {
        return $medication->update($data);
    }

    public function delete(Medication $medication): bool
    {
        return $medication->delete();
    }

    public function getMedicationsByType(string $type): Collection
    {
        return Medication::where('tipo', $type)->get();
    }

    public function getExpiringMedications(int $daysThreshold = 30): Collection
    {
        return Medication::where('fecha_vencimiento', '<=', now()->addDays($daysThreshold))->get();
    }

    public function searchMedications(string $query): Collection
    {
        return Medication::where('nombre', 'like', "%{$query}%")
            ->orWhere('descripcion', 'like', "%{$query}%")
            ->orWhere('codigo_barras', 'like', "%{$query}%")
            ->get();
    }
} 