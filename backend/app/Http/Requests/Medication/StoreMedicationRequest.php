<?php

namespace App\Http\Requests\Medication;

use Illuminate\Foundation\Http\FormRequest;

class StoreMedicationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'dosis' => 'required|string|max:100',
            'frecuencia' => 'required|string|max:100',
            'duracion' => 'required|integer|min:1',
            'tipo' => 'required|string|in:oral,inyectable,topico',
            'fecha_vencimiento' => 'required|date|after:today',
            'proveedor' => 'required|string|max:255',
            'codigo_barras' => 'nullable|string|max:50|unique:medications,codigo_barras'
        ];
    }

    public function messages()
    {
        return [
            'nombre.required' => 'El nombre del medicamento es obligatorio',
            'descripcion.required' => 'La descripción del medicamento es obligatoria',
            'dosis.required' => 'La dosis es obligatoria',
            'frecuencia.required' => 'La frecuencia es obligatoria',
            'duracion.required' => 'La duración es obligatoria',
            'tipo.required' => 'El tipo de medicamento es obligatorio',
            'fecha_vencimiento.required' => 'La fecha de vencimiento es obligatoria',
            'proveedor.required' => 'El proveedor es obligatorio',
        ];
    }
} 