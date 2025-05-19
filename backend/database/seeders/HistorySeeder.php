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
            'mascota_id' => 1, // Asegúrate de que el ID de la mascota exista
            'fecha_creacion' => now(),
            'descripcion_cliente' => 'Consulta general',
            'estado' => 'activo',
        ]);

        History::create([
            'id' => 2,
            'mascota_id' => 2, // Asegúrate de que el ID de la mascota exista
            'fecha_creacion' => now(),
            'descripcion_cliente' => 'Vacunación',
            'estado' => 'activo',
        ]);
    }
} 