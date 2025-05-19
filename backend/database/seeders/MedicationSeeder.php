<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Medication;

class MedicationSeeder extends Seeder
{
    public function run()
    {
        Medication::create([
            'nombre' => 'Amoxicilina',
            'descripcion' => 'Antibiótico para infecciones',
            'dosis' => '500mg',
            'frecuencia' => 'Cada 12 horas',
            'duracion' => 7,
            'tipo' => 'oral',
            'product_id' => 1,
        ]);

        Medication::create([
            'nombre' => 'Vacuna Parvovirus',
            'descripcion' => 'Vacuna para prevenir parvovirus en perros',
            'dosis' => '1 dosis',
            'frecuencia' => 'Anual',
            'duracion' => 1,
            'tipo' => 'inyectable',
            'product_id' => 2,
        ]);
    }
} 