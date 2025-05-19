<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nombre' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:user,email,' . $this->user->id,
            'password' => 'sometimes|string|min:8|confirmed',
            'telefono' => 'nullable|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'rol' => 'sometimes|string|in:admin,veterinario,cliente'
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'El email ya está en uso',
        ];
    }
} 