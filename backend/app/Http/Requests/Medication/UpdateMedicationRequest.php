<?php

namespace App\Http\Requests\Medication;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMedicationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nombre' => 'sometimes|string|max:255',
            'descripcion' => 'sometimes|string',
            'dosis' => 'sometimes|string|max:100',
            'frecuencia' => 'sometimes|string|max:100',
            'duracion' => 'sometimes|integer|min:1',
            'tipo' => 'sometimes|string|in:oral,inyectable,topico',
            'fecha_vencimiento' => 'sometimes|date|after:today',
            'proveedor' => 'sometimes|string|max:255',
            'codigo_barras' => 'nullable|string|max:50|unique:medications,codigo_barras,' . $this->medication->medicamento_id . ',medicamento_id'
        ];
    }

    public function messages()
    {
        return [
            'nombre.max' => 'El nombre del medicamento no puede exceder los 255 caracteres',
            'descripcion.required' => 'La descripción del medicamento es obligatoria',
            'dosis.required' => 'La dosis es obligatoria',
            'frecuencia.required' => 'La frecuencia es obligatoria',
            'duracion.required' => 'La duración es obligatoria',
            'tipo.required' => 'El tipo de medicamento es obligatorio',
            'fecha_vencimiento.date' => 'La fecha de vencimiento debe ser una fecha válida',
            'fecha_vencimiento.after' => 'La fecha de vencimiento debe ser posterior a hoy',
            'proveedor.max' => 'El nombre del proveedor no puede exceder los 255 caracteres',
            'codigo_barras.max' => 'El código de barras no puede exceder los 50 caracteres',
            'codigo_barras.unique' => 'El código de barras ya está en uso'
        ];
    }
} 