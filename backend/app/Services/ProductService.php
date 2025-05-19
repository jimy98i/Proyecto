<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductService
{
    public function getAll(): Collection
    {
        return Product::all();
    }

    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return Product::paginate($perPage);
    }

    public function findById(int $id): ?Product
    {
        return Product::find($id);
    }

    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(Product $product, array $data): bool
    {
        return $product->update($data);
    }

    public function delete(Product $product): bool
    {
        return $product->delete();
    }

    public function getProductsByCategory(string $category): Collection
    {
        return Product::where('categoria', $category)->get();
    }

    public function getProductsByProvider(string $provider): Collection
    {
        return Product::where('proveedor', $provider)->get();
    }

    public function getLowStockProducts(int $threshold = 10): Collection
    {
        return Product::where('stock', '<=', $threshold)->get();
    }

    public function getExpiringProducts(int $daysThreshold = 30): Collection
    {
        return Product::where('fecha_vencimiento', '<=', now()->addDays($daysThreshold))->get();
    }

    public function updateStock(Product $product, int $quantity, bool $isAddition = true): bool
    {
        $newStock = $isAddition ? $product->stock + $quantity : $product->stock - $quantity;
        
        if ($newStock < 0) {
            return false;
        }

        return $product->update(['stock' => $newStock]);
    }

    public function searchProducts(string $query): Collection
    {
        return Product::where('nombre', 'like', "%{$query}%")
            ->orWhere('descripcion', 'like', "%{$query}%")
            ->orWhere('codigo_barras', 'like', "%{$query}%")
            ->get();
    }
} 