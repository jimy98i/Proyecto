<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use App\Models\User;
use App\Services\PetService;
use App\Http\Requests\Pet\StorePetRequest;
use App\Http\Requests\Pet\UpdatePetRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use function Termwind\parse;

class PetController extends Controller
{
    protected PetService $petService;

    public function __construct(PetService $petService)
    {
        $this->petService = $petService;
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $pets = $this->petService->getAllPaginated($perPage);
        return response()->json($pets);
    }

    public function show(Pet $pet): JsonResponse
    {
        return response()->json($pet);
    }

    public function store(StorePetRequest $request): JsonResponse
    {
        // dd($request);
        $pet = $this->petService->create($request->validated());
        return response()->json($pet, 201);
    }

    public function update(UpdatePetRequest $request, Pet $pet): JsonResponse
    {
        $this->petService->update($pet, $request->validated());
        return response()->json($pet);
    }

    public function destroy(Pet $pet): JsonResponse
    {
        $this->petService->delete($pet);
        return response()->json(null, 204);
    }

    public function getPetsByClient($idUsuario): JsonResponse
    {  
        $user = User::find($client);
        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
        $pets = $this->petService->getPetsByClient($client);
        return response()->json($pets);
    }

    public function getPetsWithHistory(): JsonResponse
    {
        $pets = $this->petService->getPetsWithHistory();
        return response()->json($pets);
    }

    public function getPetsWithAppointments(): JsonResponse
    {
        $pets = $this->petService->getPetsWithAppointments();
        return response()->json($pets);
    }
} 