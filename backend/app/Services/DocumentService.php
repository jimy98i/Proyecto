<?php

namespace App\Services;

use App\Models\Document;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class DocumentService
{
    public function getAll(): Collection
    {
        return Document::with('history')->get();
    }

    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return Document::with('history')->paginate($perPage);
    }

    public function findById(int $id): ?Document
    {
        return Document::with('history')->find($id);
    }

    public function create(array $data): Document
    {
        return Document::create($data);
    }

    public function update(Document $document, array $data): bool
    {
        return $document->update($data);
    }

    public function delete(Document $document): bool
    {
        return $document->delete();
    }

    public function getDocumentsByHistory(int $historyId): Collection
    {
        return Document::where('historial_id', $historyId)->with('history')->get();
    }

    public function getDocumentsByType(string $type): Collection
    {
        return Document::where('tipo_documento', $type)
            ->with('history')
            ->get();
    }

    public function getDocumentsByDateRange(string $startDate, string $endDate): Collection
    {
        return Document::whereBetween('fecha_subida', [$startDate, $endDate])
            ->with('history')
            ->orderBy('fecha_subida', 'desc')
            ->get();
    }

    public function getRecentDocuments(int $limit = 10): Collection
    {
        return Document::with('history')
            ->orderBy('fecha_subida', 'desc')
            ->limit($limit)
            ->get();
    }
} 