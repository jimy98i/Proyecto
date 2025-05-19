<?php

namespace App\Http\Requests\Pet;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePetRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nombre' => 'sometimes|string|max:255',
            'tipo' => 'sometimes|string|in:perro,gato,otro',
            'raza' => 'sometimes|string|max:255',
            'edad' => 'sometimes|integer|min:0',
            'peso' => 'sometimes|numeric|min:0',
            'fecha_nacimiento' => 'sometimes|date',
            'dueno_id' => 'sometimes|exists:users,id'
        ];
    }

    public function messages()
    {
        return [
            'dueno_id.exists' => 'El dueño seleccionado no existe',
        ];
    }
} 