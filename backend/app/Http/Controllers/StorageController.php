<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class StorageController extends Controller
{
    public function serve(Request $request, string $path)
    {
        try {
            Log::info('StorageController::serve - Path recibido: ' . $path);
            
            // Limpiamos la ruta de posibles URLs completas
            $path = str_replace(['http://localhost:8000/', 'http://localhost:8000/storage/', 'http://localhost:8000/api/storage/'], '', $path);
            Log::info('StorageController::serve - Path limpio: ' . $path);
            
            // Aseguramos que la ruta comience con 'public/'
            $fullPath = $path;
            if (!str_starts_with($fullPath, 'public/')) {
                $fullPath = 'public/' . $fullPath;
            }
            Log::info('StorageController::serve - Ruta completa: ' . $fullPath);
            
            // Verificamos si el archivo existe
            if (!Storage::exists($fullPath)) {
                Log::error('StorageController::serve - Archivo no encontrado: ' . $fullPath);
                // Intentamos buscar en la carpeta correcta
                $correctPath = 'public/Imagenes/Client_User/' . basename($path);
                if (Storage::exists($correctPath)) {
                    Log::info('StorageController::serve - Archivo encontrado en ruta alternativa: ' . $correctPath);
                    $fullPath = $correctPath;
                } else {
                    return response()->json(['error' => 'File not found', 'path' => $fullPath], 404)
                        ->header('Access-Control-Allow-Origin', '*')
                        ->header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                        ->header('Access-Control-Allow-Credentials', 'true');
                }
            }

            $file = Storage::get($fullPath);
            $mimeType = Storage::mimeType($fullPath);
            Log::info('StorageController::serve - MIME type: ' . $mimeType);

            $response = response($file, 200)
                ->header('Content-Type', $mimeType)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Cache-Control', 'public, max-age=31536000');

            // Añadir headers específicos para imágenes
            if (strpos($mimeType, 'image/') === 0) {
                $response->header('Content-Disposition', 'inline');
            }

            Log::info('StorageController::serve - Archivo enviado correctamente');
            return $response;
        } catch (\Exception $e) {
            Log::error('StorageController::serve - Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage(), 'path' => $path], 500)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                ->header('Access-Control-Allow-Credentials', 'true');
        }
    }

    public function options(Request $request)
    {
        $headers = [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Max-Age' => '86400'
        ];
        return response(null, 200, $headers);
    }
} 