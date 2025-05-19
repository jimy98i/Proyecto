<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::create([
            'id' => 1,
            'nombre' => 'Antibiótico',
            'descripcion' => 'Antibiótico de amplio espectro',
            'precio' => 15.99,
            'stock' => 100,
            'categoria' => 'medicamento',
            'fecha_vencimiento' => '2023-12-31',
            'proveedor_id' => 1,
            'codigo_barras' => '1234567890123',
        ]);

        Product::create([
            'id' => 2,
            'nombre' => 'Comida para perros',
            'descripcion' => 'Comida balanceada para perros',
            'precio' => 25.50,
            'stock' => 50,
            'categoria' => 'alimento',
            'fecha_vencimiento' => '2024-06-30',
            'proveedor_id' => 2,
            'codigo_barras' => '9876543210987',
        ]);
    }
} 