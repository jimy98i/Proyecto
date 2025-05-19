<?php

namespace App\Http\Requests\TreatmentProduct;

use Illuminate\Foundation\Http\FormRequest;

class StoreTreatmentProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'treatment_id' => 'required|exists:treatments,id',
            'product_id' => 'required|exists:products,producto_id',
            'cantidad' => 'required|integer|min:1'
        ];
    }

    public function messages()
    {
        return [
            'treatment_id.required' => 'El tratamiento es obligatorio',
            'product_id.required' => 'El producto es obligatorio',
            'cantidad.required' => 'La cantidad es obligatoria',
        ];
    }
} 