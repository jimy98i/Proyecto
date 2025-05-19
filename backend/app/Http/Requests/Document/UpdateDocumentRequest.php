<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDocumentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'historial_id' => 'sometimes|exists:histories,historial_id',
            'tipo_documento' => 'sometimes|string|in:analisis,radiografia,ecografia,historial,otro',
            'nombre_archivo' => 'sometimes|string|max:255',
            'ruta_archivo' => 'sometimes|string|max:255',
            'fecha_subida' => 'sometimes|date',
            'descripcion' => 'nullable|string'
        ];
    }

    public function messages()
    {
        return [
            'historial_id.exists' => 'El historial seleccionado no existe',
        ];
    }
} 