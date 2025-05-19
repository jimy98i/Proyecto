<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Services\HistoryService;
use App\Http\Requests\History\StoreHistoryRequest;
use App\Http\Requests\History\UpdateHistoryRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    protected HistoryService $historyService;

    public function __construct(HistoryService $historyService)
    {
        $this->historyService = $historyService;
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $histories = $this->historyService->getAllPaginated($perPage);
        return response()->json($histories);
    }

    public function show(History $history): JsonResponse
    {
        dd($history);
        return response()->json($history);
    }

    public function store(StoreHistoryRequest $request): JsonResponse
    {
        $history = $this->historyService->create($request->validated());
        return response()->json($history, 201);
    }

    public function update(UpdateHistoryRequest $request, History $history): JsonResponse
    {
        $this->historyService->update($history, $request->validated());
        return response()->json($history);
    }

    public function destroy(History $history): JsonResponse
    {
        $this->historyService->delete($history);
        return response()->json(null, 204);
    }

    public function getByPet(int $petId): JsonResponse
    {
        $history = $this->historyService->getHistoryByPet($petId);
        return response()->json($history);
    }

    public function getHistoryWithLines(int $id): JsonResponse
    {
        $history = $this->historyService->getHistoryWithLines($id);
        return response()->json($history);
    }

    public function getHistoryWithDocuments(int $id): JsonResponse
    {
        $history = $this->historyService->getHistoryWithDocuments($id);
        return response()->json($history);
    }

    public function getHistoryWithAppointments(int $id): JsonResponse
    {
        $history = $this->historyService->getHistoryWithAppointments($id);
        return response()->json($history);
    }
} 