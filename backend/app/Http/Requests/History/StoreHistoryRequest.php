<?php

namespace App\Http\Requests\History;

use Illuminate\Foundation\Http\FormRequest;

class StoreHistoryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'mascota_id' => 'required|exists:pets,mascota_id',
            'fecha_creacion' => 'required|date',
            'descripcion_cliente' => 'required|string',
            'estado' => 'required|string|in:activo,inactivo'
        ];
    }

    public function messages()
    {
        return [
            'mascota_id.required' => 'La mascota es obligatoria',
            'mascota_id.exists' => 'La mascota seleccionada no existe',
            'fecha_creacion.required' => 'La fecha de creación es obligatoria',
            'fecha_creacion.date' => 'La fecha de creación debe ser una fecha válida',
            'descripcion_cliente.required' => 'La descripción del cliente es obligatoria',
            'estado.required' => 'El estado es obligatorio',
        ];
    }
} 