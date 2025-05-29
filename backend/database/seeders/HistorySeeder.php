<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\History;

class HistorySeeder extends Seeder
{
    public function run()
    {
        History::create([
            'id' => 1,
            'mascota_id' => 1,
            'fecha_creacion' => now(),
            'descripcion_cliente' => 'Consulta general',
            'estado' => 'activo',
        ]);

        History::create([
            'id' => 2,
            'mascota_id' => 2, 
            'fecha_creacion' => now(),
            'descripcion_cliente' => 'Vacunación',
            'estado' => 'activo',
        ]);
        History::create([
            'id' => 3,
            'mascota_id' => 3,
            'fecha_creacion' => now(),
            'descripcion_cliente' => 'Vacunación',
            'estado' => 'activo',
        ]);
        History::create([
            'id' => 4,
            'mascota_id' => 4,
            'fecha_creacion' => now(),
            'descripcion_cliente' => 'Vacunación',
            'estado' => 'activo',
        ]);
    }
} 