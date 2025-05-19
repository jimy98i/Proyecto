<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'precio' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'categoria' => 'sometimes|string|in:medicamento,alimento,accesorio,higiene,otro',
            'fecha_vencimiento' => 'sometimes|date|after:today',
            'proveedor' => 'sometimes|string|max:255',
            'codigo_barras' => 'nullable|string|max:50|unique:products,codigo_barras,' . $this->product->producto_id . ',producto_id'
        ];
    }

    public function messages()
    {
        return [
            'nombre.max' => 'El nombre del producto no puede exceder los 255 caracteres',
            'precio.numeric' => 'El precio debe ser un número',
            'precio.min' => 'El precio no puede ser negativo',
            'stock.integer' => 'El stock debe ser un número entero',
            'stock.min' => 'El stock no puede ser negativo',
            'categoria.in' => 'La categoría debe ser una de: medicamento, alimento, accesorio, higiene, otro',
            'fecha_vencimiento.date' => 'La fecha de vencimiento debe ser una fecha válida',
            'fecha_vencimiento.after' => 'La fecha de vencimiento debe ser posterior a hoy',
            'proveedor.max' => 'El nombre del proveedor no puede exceder los 255 caracteres',
            'codigo_barras.max' => 'El código de barras no puede exceder los 50 caracteres',
            'codigo_barras.unique' => 'El código de barras ya está en uso'
        ];
    }
} 