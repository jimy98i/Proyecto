<?php

namespace App\Http\Requests\History;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHistoryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'mascota_id' => 'sometimes|exists:pets,mascota_id',
            'fecha_creacion' => 'sometimes|date',
            'descripcion_cliente' => 'sometimes|string',
            'estado' => 'sometimes|string|in:activo,inactivo'
        ];
    }

    public function messages()
    {
        return [
            'mascota_id.exists' => 'La mascota seleccionada no existe',
            'fecha_creacion.date' => 'La fecha de creación debe ser una fecha válida'
        ];
    }
} 