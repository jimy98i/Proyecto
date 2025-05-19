<?php

namespace App\Http\Requests\HistoryLine;

use Illuminate\Foundation\Http\FormRequest;

class StoreHistoryLineRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'historial_id' => 'required|exists:histories,id',
            'descripcion' => 'required|string',
            'fecha' => 'required|date',
            'estado' => 'required|string|in:activo,inactivo'
        ];
    }

    public function messages()
    {
        return [
            'historial_id.required' => 'El historial es obligatorio',
            'descripcion.required' => 'La descripción es obligatoria',
            'fecha.required' => 'La fecha es obligatoria',
            'estado.required' => 'El estado es obligatorio',
        ];
    }
}