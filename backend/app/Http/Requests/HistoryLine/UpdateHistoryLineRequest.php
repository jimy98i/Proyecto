<?php

namespace App\Http\Requests\HistoryLine;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHistoryLineRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'historial_id' => 'sometimes|exists:histories,id',
            'descripcion' => 'sometimes|string',
            'fecha' => 'sometimes|date',
            'estado' => 'sometimes|string|in:activo,inactivo'
        ];
    }

    public function messages()
    {
        return [
            'historial_id.exists' => 'El historial seleccionado no existe',
        ];
    }
} 