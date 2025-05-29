<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pet;

class PetSeeder extends Seeder
{
    public function run()
    {
        Pet::create([
            'id' => 1,
            'nombre' => 'Fido',
            'tipo' => 'perro',
            'raza' => 'Labrador',
            'edad' => 3,
            'peso' => 30.5,
            'fecha_nacimiento' => '2019-01-01',
            'dueno_id' => 3,
        ]);

        Pet::create([
            'id' => 2,
            'nombre' => 'Mittens',
            'tipo' => 'gato',
            'raza' => 'Siames',
            'edad' => 2,
            'peso' => 4.5,
            'fecha_nacimiento' => '2020-05-01',
            'dueno_id' => 4,
        ]);
        Pet::create([
            'id' => 3,
            'nombre' => 'Minino',
            'tipo' => 'gato',
            'raza' => 'Siames',
            'edad' => 2,
            'peso' => 4.5,
            'fecha_nacimiento' => '2020-05-01',
            'dueno_id' => 5,
        ]);
        Pet::create([
            'id' => 4,
            'nombre' => 'Musi',
            'tipo' => 'gato',
            'raza' => 'Siames',
            'edad' => 2,
            'peso' => 4.5,
            'fecha_nacimiento' => '2020-05-01',
            'dueno_id' => 6,
        ]);
    }
} 