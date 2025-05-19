<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Treatment;

class TreatmentSeeder extends Seeder
{
    public function run()
    {
        Treatment::create([
            'historial_id' => 1, // Asegúrate de que el ID del historial exista
            'descripcion' => 'Tratamiento para infección',
            'fecha_inicio' => '2023-09-01',
            'fecha_fin' => '2023-09-08',
            'estado' => 'activo',
        ]);

        Treatment::create([
            'historial_id' => 2, // Asegúrate de que el ID del historial exista
            'descripcion' => 'Tratamiento de vacunación',
            'fecha_inicio' => '2023-10-01',
            'fecha_fin' => '2023-10-01',
            'estado' => 'activo',
        ]);
    }
} 