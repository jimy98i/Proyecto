<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProviderSeeder::class,
            UserSeeder::class,
            PetSeeder::class,
            HistorySeeder::class,
            HistoryLineSeeder::class,
            DocumentSeeder::class,
            ProductSeeder::class,
            MedicationSeeder::class,
            AppointmentSeeder::class,
            TreatmentSeeder::class,
        ]);
    }
}
