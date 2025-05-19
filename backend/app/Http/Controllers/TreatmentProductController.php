<?php

namespace App\Http\Controllers;

use App\Http\Requests\TreatmentProduct\StoreTreatmentProductRequest;
use App\Http\Requests\TreatmentProduct\UpdateTreatmentProductRequest;
use App\Models\TreatmentProduct;
use App\Services\TreatmentProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TreatmentProductController extends Controller
{
    protected TreatmentProductService $treatmentProductService;

    public function __construct(TreatmentProductService $treatmentProductService)
    {
        $this->treatmentProductService = $treatmentProductService;
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $treatmentProducts = $this->treatmentProductService->getAllPaginated($perPage);
        return response()->json($treatmentProducts);
    }

    public function store(StoreTreatmentProductRequest $request): JsonResponse
    {
        $treatmentProduct = $this->treatmentProductService->create($request->validated());
        return response()->json($treatmentProduct, 201);
    }

    public function show(TreatmentProduct $treatmentProduct): JsonResponse
    {
        return response()->json($treatmentProduct);
    }

    public function update(UpdateTreatmentProductRequest $request, TreatmentProduct $treatmentProduct): JsonResponse
    {
        $this->treatmentProductService->update($treatmentProduct, $request->validated());
        return response()->json($treatmentProduct);
    }

    public function destroy(TreatmentProduct $treatmentProduct): JsonResponse
    {
        $this->treatmentProductService->delete($treatmentProduct);
        return response()->json(null, 204);
    }

    public function getByTreatment(int $treatmentId): JsonResponse
    {
        $treatmentProducts = $this->treatmentProductService->getByTreatment($treatmentId);
        return response()->json($treatmentProducts);
    }
} 