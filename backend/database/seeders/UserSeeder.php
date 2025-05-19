<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'id' => 1,
            'nombre' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'), // Asegúrate de encriptar la contraseña
            'telefono' => '123456789',
            'direccion' => 'Calle Admin 123',
            'rol' => 'admin',
        ]);

        User::create([
            'id' => 2,
            'nombre' => 'Veterinarian User',
            'email' => 'vet@example.com',
            'password' => bcrypt('password'),
            'telefono' => '987654321',
            'direccion' => 'Calle Veterinario 456',
            'rol' => 'veterinario',
        ]);

        User::create([
            'id' => 3,
            'nombre' => 'Client User',
            'email' => 'client@example.com',
            'password' => bcrypt('password'),
            'telefono' => '555555555',
            'direccion' => 'Calle Cliente 789',
            'rol' => 'cliente',
        ]);
    }
} 