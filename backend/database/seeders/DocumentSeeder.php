<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Document;

class DocumentSeeder extends Seeder
{
    public function run()
    {
        Document::create([
            'historial_id' => 1, // Asegúrate de que el ID del historial exista
            'tipo_documento' => 'radiografia',
            'nombre_archivo' => 'radiografia_fido.jpg',
            'ruta_archivo' => '/documents/radiografia_fido.jpg',
            'fecha_subida' => now(),
            'descripcion' => 'Radiografía de Fido',
        ]);

        Document::create([
            'historial_id' => 2, // Asegúrate de que el ID del historial exista
            'tipo_documento' => 'analisis',
            'nombre_archivo' => 'analisis_mittens.pdf',
            'ruta_archivo' => '/documents/analisis_mittens.pdf',
            'fecha_subida' => now(),
            'descripcion' => 'Análisis de Mittens',
        ]);
    }
} 