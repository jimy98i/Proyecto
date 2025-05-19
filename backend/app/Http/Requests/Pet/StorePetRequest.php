<?php

namespace App\Http\Requests\Pet;

use Illuminate\Foundation\Http\FormRequest;

class StorePetRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|string|in:perro,gato,otro',
            'raza' => 'nullable|string|max:255',
            'edad' => 'required|integer|min:0',
            'peso' => 'required|numeric|min:0',
            'fecha_nacimiento' => 'required|date',
            'dueno_id' => 'required|exists:users,id'
        ];
    }

    public function messages()
    {
        return [
            'nombre.required' => 'El nombre de la mascota es obligatorio',
            'tipo.required' => 'El tipo de mascota es obligatorio',
            'edad.required' => 'La edad de la mascota es obligatoria',
            'peso.required' => 'El peso de la mascota es obligatorio',
            'dueno_id.required' => 'El dueño de la mascota es obligatorio',
        ];
    }
} 