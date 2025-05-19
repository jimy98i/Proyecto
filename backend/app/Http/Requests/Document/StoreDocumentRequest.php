<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'historial_id' => 'required|exists:histories,historial_id',
            'tipo_documento' => 'required|string|in:analisis,radiografia,ecografia,historial,otro',
            'nombre_archivo' => 'required|string|max:255',
            'ruta_archivo' => 'required|string|max:255',
            'fecha_subida' => 'required|date',
            'descripcion' => 'nullable|string'
        ];
    }

    public function messages()
    {
        return [
            'historial_id.required' => 'El historial es obligatorio',
            'tipo_documento.required' => 'El tipo de documento es obligatorio',
            'nombre_archivo.required' => 'El nombre del archivo es obligatorio',
            'ruta_archivo.required' => 'La ruta del archivo es obligatoria',
            'fecha_subida.required' => 'La fecha de subida es obligatoria',
        ];
    }
} 