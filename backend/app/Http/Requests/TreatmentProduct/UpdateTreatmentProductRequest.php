<?php

namespace App\Http\Requests\TreatmentProduct;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTreatmentProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'treatment_id' => 'sometimes|exists:treatments,id',
            'product_id' => 'sometimes|exists:products,producto_id',
            'cantidad' => 'sometimes|integer|min:1'
        ];
    }

    public function messages()
    {
        return [
            'treatment_id.exists' => 'El tratamiento seleccionado no existe',
            'product_id.exists' => 'El producto seleccionado no existe',
        ];
    }
} 