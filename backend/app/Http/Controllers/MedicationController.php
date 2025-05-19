<?php

namespace App\Http\Controllers;

use App\Http\Requests\Medication\StoreMedicationRequest;
use App\Http\Requests\Medication\UpdateMedicationRequest;
use App\Models\Medication;
use App\Services\MedicationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MedicationController extends Controller
{
    protected MedicationService $medicationService;

    public function __construct(MedicationService $medicationService)
    {
        $this->medicationService = $medicationService;
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $medications = $this->medicationService->getAllPaginated($perPage);
        return response()->json($medications);
    }

    public function store(StoreMedicationRequest $request): JsonResponse
    {
        $medication = $this->medicationService->create($request->validated());
        return response()->json($medication, 201);
    }

    public function show(Medication $medication): JsonResponse
    {
        return response()->json($medication);
    }

    public function update(UpdateMedicationRequest $request, Medication $medication): JsonResponse
    {
        $this->medicationService->update($medication, $request->validated());
        return response()->json($medication);
    }

    public function destroy(Medication $medication): JsonResponse
    {
        $this->medicationService->delete($medication);
        return response()->json(null, 204);
    }

    public function getByType(string $type): JsonResponse
    {
        $medications = $this->medicationService->getMedicationsByType($type);
        return response()->json($medications);
    }

    public function getExpiring(Request $request): JsonResponse
    {
        $daysThreshold = $request->input('days_threshold', 30);
        $medications = $this->medicationService->getExpiringMedications($daysThreshold);
        return response()->json($medications);
    }

    public function search(Request $request): JsonResponse
    {
        $query = $request->input('query');
        $medications = $this->medicationService->searchMedications($query);
        return response()->json($medications);
    }
} 