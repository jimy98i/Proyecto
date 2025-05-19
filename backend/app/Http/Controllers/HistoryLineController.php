<?php

namespace App\Http\Controllers;

use App\Models\HistoryLine;
use App\Services\HistoryLineService;
use App\Http\Requests\HistoryLine\StoreHistoryLineRequest;
use App\Http\Requests\HistoryLine\UpdateHistoryLineRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HistoryLineController extends Controller
{
    protected HistoryLineService $historyLineService;

    public function __construct(HistoryLineService $historyLineService)
    {
        $this->historyLineService = $historyLineService;
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $historyLines = $this->historyLineService->getAllPaginated($perPage);
        return response()->json($historyLines);
    }

    public function show(HistoryLine $historyLine): JsonResponse
    {
        return response()->json($historyLine);
    }

    public function store(StoreHistoryLineRequest $request): JsonResponse
    {
        $historyLine = $this->historyLineService->create($request->validated());
        return response()->json($historyLine, 201);
    }

    public function update(UpdateHistoryLineRequest $request, HistoryLine $historyLine): JsonResponse
    {
        $this->historyLineService->update($historyLine, $request->validated());
        return response()->json($historyLine);
    }

    public function destroy(HistoryLine $historyLine): JsonResponse
    {
        $this->historyLineService->delete($historyLine);
        return response()->json(null, 204);
    }

    public function getByHistory(int $historyId): JsonResponse
    {
        $historyLines = $this->historyLineService->getHistoryLinesByHistory($historyId);
        return response()->json($historyLines);
    }

    public function getActiveHistoryLines(): JsonResponse
    {
        $historyLines = $this->historyLineService->getActiveHistoryLines();
        return response()->json($historyLines);
    }

    public function getCompletedHistoryLines(): JsonResponse
    {
        $historyLines = $this->historyLineService->getCompletedHistoryLines();
        return response()->json($historyLines);
    }

    public function getHistoryLinesWithTreatments(int $historyId): JsonResponse
    {
        $historyLines = $this->historyLineService->getHistoryLinesWithTreatments($historyId);
        return response()->json($historyLines);
    }

    public function getHistoryLinesWithAppointments(int $historyId): JsonResponse
    {
        $historyLines = $this->historyLineService->getHistoryLinesWithAppointments($historyId);
        return response()->json($historyLines);
    }
} 