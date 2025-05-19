<?php

namespace App\Services;

use App\Models\TreatmentProduct;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class TreatmentProductService
{
    public function getAll(): Collection
    {
        return TreatmentProduct::with(['treatment', 'product'])->get();
    }

    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return TreatmentProduct::with(['treatment', 'product'])->paginate($perPage);
    }

    public function findById(int $id): ?TreatmentProduct
    {
        return TreatmentProduct::with(['treatment', 'product'])->find($id);
    }

    public function create(array $data): TreatmentProduct
    {
        return TreatmentProduct::create($data);
    }

    public function update(TreatmentProduct $treatmentProduct, array $data): bool
    {
        return $treatmentProduct->update($data);
    }

    public function delete(TreatmentProduct $treatmentProduct): bool
    {
        return $treatmentProduct->delete();
    }

    public function getByTreatment(int $treatmentId): Collection
    {
        return TreatmentProduct::where('treatment_id', $treatmentId)->with(['treatment', 'product'])->get();
    }
} 