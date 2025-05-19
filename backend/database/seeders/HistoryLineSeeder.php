<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HistoryLine;

class HistoryLineSeeder extends Seeder
{
    public function run()
    {
        HistoryLine::create([
            'id' => 1,
            'historial_id' => 1, // Asegúrate de que el ID del historial exista
            'descripcion' => 'Línea de historial 1',
            'fecha' => now(),
            'estado' => 'activo',
        ]);

        HistoryLine::create([
            'id' => 2,
            'historial_id' => 2, // Asegúrate de que el ID del historial exista
            'descripcion' => 'Línea de historial 2',
            'fecha' => now(),
            'estado' => 'activo',
        ]);
    }
} 