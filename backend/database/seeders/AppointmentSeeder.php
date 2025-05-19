<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;

class AppointmentSeeder extends Seeder
{
    public function run()
    {
        Appointment::create([
            'linea_historial_id' => 1, // Asegúrate de que el ID de la línea de historial exista
            'fecha_cita' => '2025-5-01',
            'hora_cita' => '10:00',
            'tipo_cita' => 'consulta',
            'estado' => 'programada',
            'notas' => 'Consulta de rutina',
            'user_id' => 1, // Asegúrate de que el ID del usuario exista
        ]);

        Appointment::create([
            'linea_historial_id' => 2, // Asegúrate de que el ID de la línea de historial exista
            'fecha_cita' => '2025-5-02',
            'hora_cita' => '11:00',
            'tipo_cita' => 'vacunación',
            'estado' => 'programada',
            'notas' => 'Vacunación de refuerzo',
            'user_id' => 2, // Asegúrate de que el ID del usuario exista
        ]);
    }
} 