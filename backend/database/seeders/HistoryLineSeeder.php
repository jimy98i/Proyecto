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
            'historial_id' => 1,
            'descripcion' => 'Línea de historial 1',
            'fecha' => now(),
            'estado' => 'activo',
        ]);

        HistoryLine::create([
            'id' => 2,
            'historial_id' => 2,
            'descripcion' => 'Línea de historial 2',
            'fecha' => now(),
            'estado' => 'activo',
        ]);
        HistoryLine::create([
            'id' => 3,
            'historial_id' => 3,
            'descripcion' => 'Línea de historial 2',
            'fecha' => now(),
            'estado' => 'activo',
        ]);
        HistoryLine::create([
            'id' => 4,
            'historial_id' => 4,
            'descripcion' => 'Línea de historial 2',
            'fecha' => now(),
            'estado' => 'activo',
        ]);
    }
} 