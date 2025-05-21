<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:5|confirmed',
            'password_confirmation' => 'required|string|min:5',
            'telefono' => 'nullable|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'rol' => 'required|string|in:admin,veterinario,cliente'
        ];
    }

    public function messages()
    {
        return [
            'nombre.required' => 'El nombre es obligatorio',
            'email.required' => 'El email es obligatorio',
            'email.unique' => 'Este email ya está registrado',
            'password.required' => 'La contraseña es obligatoria',
            'password.min' => 'La contraseña debe tener al menos 5 caracteres',
            'password.confirmed' => 'Las contraseñas no coinciden',
            'password_confirmation.required' => 'Debes confirmar la contraseña',
            'password_confirmation.min' => 'La confirmación de contraseña debe tener al menos 5 caracteres',
            'rol.required' => 'El rol es obligatorio',
            'rol.in' => 'El rol debe ser admin, veterinario o cliente'
        ];
    }
} 