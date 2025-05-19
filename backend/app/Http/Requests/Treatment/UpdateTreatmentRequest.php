<?php

namespace App\Http\Requests\Treatment;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTreatmentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'historial_id' => 'sometimes|exists:histories,historial_id',
            'descripcion' => 'sometimes|string',
            'fecha_inicio' => 'sometimes|date|after_or_equal:today',
            'fecha_fin' => 'sometimes|date|after:fecha_inicio',
            'medicaciones' => 'nullable|array',
            'medicaciones.*' => 'exists:medications,medicamento_id',
            'productos' => 'nullable|array',
            'productos.*' => 'exists:products,producto_id',
            'estado' => 'sometimes|string|in:activo,completado,cancelado'
        ];
    }

    public function messages()
    {
        return [
            'historial_id.exists' => 'El historial seleccionado no existe',
        ];
    }
} 