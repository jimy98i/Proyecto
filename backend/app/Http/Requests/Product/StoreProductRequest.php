<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoria' => 'required|string|in:medicamento,alimento,accesorio,higiene,otro',
            'fecha_vencimiento' => 'required|date|after:today',
            'proveedor' => 'required|string|max:255',
            'codigo_barras' => 'nullable|string|max:50|unique:products,codigo_barras'
        ];
    }

    public function messages()
    {
        return [
            'nombre.required' => 'El nombre del producto es obligatorio',
            'descripcion.required' => 'La descripción del producto es obligatoria',
            'precio.required' => 'El precio del producto es obligatorio',
            'stock.required' => 'El stock del producto es obligatorio',
            'categoria.required' => 'La categoría del producto es obligatoria',
            'fecha_vencimiento.required' => 'La fecha de vencimiento es obligatoria',
            'proveedor.required' => 'El proveedor es obligatorio',
        ];
    }
} 