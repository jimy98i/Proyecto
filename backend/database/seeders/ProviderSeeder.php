<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Provider;

class ProviderSeeder extends Seeder
{
    public function run()
    {
        Provider::create([
            'nombre' => 'Proveedor 1',
            'telefono' => '123456789',
            'direccion' => 'Calle Falsa 123',
            'email' => 'proveedor1@example.com',
        ]);

        Provider::create([
            'nombre' => 'Proveedor 2',
            'telefono' => '987654321',
            'direccion' => 'Avenida Siempre Viva 742',
            'email' => 'proveedor2@example.com',
        ]);

    }
} 