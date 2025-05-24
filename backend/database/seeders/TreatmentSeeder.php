<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Treatment;
use App\Models\Product;
use App\Models\History;

class TreatmentSeeder extends Seeder
{
    public function run(): void
    {
        // Obtener todos los historiales
        $histories = History::all();

        foreach ($histories as $history) {
            // Crear 1-3 tratamientos por historial
            $numTreatments = rand(1, 3);
            
            for ($i = 0; $i < $numTreatments; $i++) {
                $treatment = Treatment::create([
                    'historial_id' => $history->id,
                    'descripcion' => 'Tratamiento ' . ($i + 1) . ' para ' . $history->pet->nombre,
                    'fecha_inicio' => now(),
                    'fecha_fin' => now()->addDays(rand(7, 30)),
                    'estado' => collect(['activo', 'completado', 'cancelado'])->random()
                ]);

                // Asociar 1-3 productos al tratamiento
                $products = Product::inRandomOrder()->take(rand(1, 3))->get();
                foreach ($products as $product) {
                    $treatment->products()->attach($product->id, [
                        'cantidad' => rand(1, 5)
                    ]);
                }
            }
        }
    }
} 