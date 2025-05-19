<?php

namespace App\Http\Controllers;

use App\Http\Requests\Document\StoreDocumentRequest;
use App\Http\Requests\Document\UpdateDocumentRequest;
use App\Models\Document;
use App\Services\DocumentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    protected DocumentService $documentService;

    public function __construct(DocumentService $documentService)
    {
        $this->documentService = $documentService;
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $documents = $this->documentService->getAllPaginated($perPage);
        return response()->json($documents);
    }

    public function store(StoreDocumentRequest $request): JsonResponse
    {
        $document = $this->documentService->create($request->validated());
        return response()->json($document, 201);
    }

    public function show(Document $document): JsonResponse
    {
        $document = $this->documentService->findById($document->documento_id);
        return response()->json($document);
    }

    public function update(UpdateDocumentRequest $request, Document $document): JsonResponse
    {
        $this->documentService->update($document, $request->validated());
        return response()->json($document);
    }

    public function destroy(Document $document): JsonResponse
    {
        $this->documentService->delete($document);
        return response()->json(null, 204);
    }

    public function getByHistory(int $historyId): JsonResponse
    {
        $documents = $this->documentService->getDocumentsByHistory($historyId);
        return response()->json($documents);
    }

    public function getByType(string $type): JsonResponse
    {
        $documents = $this->documentService->getDocumentsByType($type);
        return response()->json($documents);
    }

    public function getByDateRange(Request $request): JsonResponse
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        
        $documents = $this->documentService->getDocumentsByDateRange($startDate, $endDate);
        return response()->json($documents);
    }

    public function getRecent(Request $request): JsonResponse
    {
        $limit = $request->input('limit', 10);
        $documents = $this->documentService->getRecentDocuments($limit);
        return response()->json($documents);
    }
} 