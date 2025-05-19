<?php

namespace App\Services;

use App\Models\Pet;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class PetService
{
    public function __construct(protected Pet $pet)
    {
    }

    public function getAll(): Collection
    {
        return Pet::with('client')->get();
    }

    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return Pet::with('client')->paginate($perPage);
    }

    public function findById(string $id): ?Pet
    {
        return Pet::with('client')->find($id);
    }

    public function create(array $data): Pet
    {
        // dd($data);
        return Pet::create($data);
    }

    public function update(Pet $pet, array $data): bool
    {
        return $pet->update($data);
    }

    public function delete(Pet $pet): bool
    {
        return $pet->delete();
    }

    public function getPetsByClient(int $clientId): Collection
    {
        return Pet::where('dueno_id', $clientId)->with('client')->get();
    }

    public function getPetsWithHistory(): Collection
    {
        return $this->pet->with('history')->get();
    }

    public function getPetsWithAppointments(): Collection
    {
        return $this->pet->with('appointments')->get();
    }
} 