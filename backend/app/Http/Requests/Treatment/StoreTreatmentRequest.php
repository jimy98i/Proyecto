<?php

namespace App\Http\Requests\Treatment;

use Illuminate\Foundation\Http\FormRequest;

class StoreTreatmentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'historial_id' => 'required|exists:histories,historial_id',
            'descripcion' => 'required|string',
            'fecha_inicio' => 'required|date|after_or_equal:today',
            'fecha_fin' => 'required|date|after:fecha_inicio',
            'medicaciones' => 'nullable|array',
            'medicaciones.*' => 'exists:medications,medicamento_id',
            'productos' => 'nullable|array',
            'productos.*' => 'exists:products,producto_id',
            'estado' => 'required|string|in:activo,completado,cancelado'
        ];
    }

    public function messages()
    {
        return [
            'historial_id.required' => 'El historial es obligatorio',
            'descripcion.required' => 'La descripción es obligatoria',
            'fecha_inicio.required' => 'La fecha de inicio es obligatoria',
            'fecha_fin.required' => 'La fecha de fin es obligatoria',
            'fecha_fin.after' => 'La fecha de fin debe ser posterior a la fecha de inicio',
            'estado.required' => 'El estado es obligatorio',
        ];
    }
} 