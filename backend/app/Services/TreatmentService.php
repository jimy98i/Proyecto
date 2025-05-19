<?php

namespace App\Services;

use App\Models\Treatment;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class TreatmentService
{
    public function __construct(protected Treatment $treatment)
    {
    }

    public function getAll(): Collection
    {
        return Treatment::with(['history', 'medications', 'products'])->get();
    }

    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return Treatment::with(['history', 'medications', 'products'])->paginate($perPage);
    }

    public function findById(int $id): ?Treatment
    {
        return Treatment::with(['history', 'medications', 'products'])->find($id);
    }

    public function create(array $data): Treatment
    {
        return Treatment::create($data);
    }

    public function update(Treatment $treatment, array $data): bool
    {
        return $treatment->update($data);
    }

    public function delete(Treatment $treatment): bool
    {
        return $treatment->delete();
    }

    public function getTreatmentsByHistory(int $historyId): Collection
    {
        return Treatment::where('historial_id', $historyId)->with(['history', 'medications', 'products'])->get();
    }

    public function getTreatmentsWithMedications(int $historyLineId): Collection
    {
        return $this->treatment->with('medications')
            ->where('linea_historial_id', $historyLineId)
            ->get();
    }

    public function getTreatmentsWithProducts(int $historyLineId): Collection
    {
        return $this->treatment->with('products')
            ->where('linea_historial_id', $historyLineId)
            ->get();
    }

    public function getActiveTreatments(): Collection
    {
        return Treatment::where('estado', 'activo')->with(['history', 'medications', 'products'])->get();
    }

    public function getCompletedTreatments(): Collection
    {
        return Treatment::where('estado', 'completado')->with(['history', 'medications', 'products'])->get();
    }

    public function getCanceledTreatments(): Collection
    {
        return Treatment::where('estado', 'cancelado')->with(['history', 'medications', 'products'])->get();
    }
} 