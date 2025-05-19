<?php

namespace App\Http\Controllers;

use App\Http\Requests\Provider\StoreProviderRequest;
use App\Http\Requests\Provider\UpdateProviderRequest;
use App\Models\Provider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
    protected $providerService;

    public function __construct()
    {
        // Puedes inyectar un servicio si lo necesitas
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $providers = Provider::paginate($perPage);
        return response()->json($providers);
    }

    public function store(StoreProviderRequest $request): JsonResponse
    {
        $provider = Provider::create($request->validated());
        return response()->json($provider, 201);
    }

    public function show(Provider $provider): JsonResponse
    {
        return response()->json($provider);
    }

    public function update(UpdateProviderRequest $request, Provider $provider): JsonResponse
    {
        $provider->update($request->validated());
        return response()->json($provider);
    }

    public function destroy(Provider $provider): JsonResponse
    {
        $provider->delete();
        return response()->json(null, 204);
    }
} 