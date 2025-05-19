<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $products = $this->productService->getAllPaginated($perPage);
        return response()->json($products);
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = $this->productService->create($request->validated());
        return response()->json($product, 201);
    }

    public function show(Product $product): JsonResponse
    {
        $product = $this->productService->findById($product->producto_id);
        return response()->json($product);
    }

    public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        $this->productService->update($product, $request->validated());
        return response()->json($product);
    }

    public function destroy(Product $product): JsonResponse
    {
        $this->productService->delete($product);
        return response()->json(null, 204);
    }

    public function getByCategory(string $category): JsonResponse
    {
        $products = $this->productService->getProductsByCategory($category);
        return response()->json($products);
    }

    public function getByProvider(string $provider): JsonResponse
    {
        $products = $this->productService->getProductsByProvider($provider);
        return response()->json($products);
    }

    public function getLowStock(Request $request): JsonResponse
    {
        $threshold = $request->input('threshold', 10);
        $products = $this->productService->getLowStockProducts($threshold);
        return response()->json($products);
    }

    public function getExpiring(Request $request): JsonResponse
    {
        $daysThreshold = $request->input('days_threshold', 30);
        $products = $this->productService->getExpiringProducts($daysThreshold);
        return response()->json($products);
    }

    public function updateStock(Request $request, Product $product): JsonResponse
    {
        $quantity = $request->input('quantity');
        $isAddition = $request->input('is_addition', true);

        $success = $this->productService->updateStock($product, $quantity, $isAddition);

        if (!$success) {
            return response()->json(['message' => 'No hay suficiente stock disponible'], 400);
        }

        return response()->json($product);
    }

    public function search(Request $request): JsonResponse
    {
        $query = $request->input('query');
        $products = $this->productService->searchProducts($query);
        return response()->json($products);
    }
} 