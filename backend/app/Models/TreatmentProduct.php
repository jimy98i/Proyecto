<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TreatmentProduct extends Model
{
    use HasFactory;

    protected $table = 'treatment_products'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'treatment_id',
        'product_id',
        'cantidad'
    ];

    public function treatment()
    {
        return $this->belongsTo(Treatment::class, 'treatment_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}