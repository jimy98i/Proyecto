<?php

namespace App\Http\Controllers;

use App\Models\Treatment;
use App\Services\TreatmentService;
use App\Http\Requests\Treatment\StoreTreatmentRequest;
use App\Http\Requests\Treatment\UpdateTreatmentRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TreatmentController extends Controller
{
    protected TreatmentService $treatmentService;

    public function __construct(TreatmentService $treatmentService)
    {
        $this->treatmentService = $treatmentService;
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $treatments = $this->treatmentService->getAllPaginated($perPage);
        return response()->json($treatments);
    }

    public function show(Treatment $treatment): JsonResponse
    {
        return response()->json($treatment);
    }

    public function store(StoreTreatmentRequest $request): JsonResponse
    {
        $treatment = $this->treatmentService->create($request->validated());
        return response()->json($treatment, 201);
    }

    public function update(UpdateTreatmentRequest $request, Treatment $treatment): JsonResponse
    {
        $this->treatmentService->update($treatment, $request->validated());
        return response()->json($treatment);
    }

    public function destroy(Treatment $treatment): JsonResponse
    {
        $this->treatmentService->delete($treatment);
        return response()->json(null, 204);
    }

    public function getByHistory(int $historyId): JsonResponse
    {
        $treatments = $this->treatmentService->getTreatmentsByHistory($historyId);
        return response()->json($treatments);
    }

    public function getActive(): JsonResponse
    {
        $treatments = $this->treatmentService->getActiveTreatments();
        return response()->json($treatments);
    }

    public function getCompleted(): JsonResponse
    {
        $treatments = $this->treatmentService->getCompletedTreatments();
        return response()->json($treatments);
    }

    public function getCanceled(): JsonResponse
    {
        $treatments = $this->treatmentService->getCanceledTreatments();
        return response()->json($treatments);
    }
} 