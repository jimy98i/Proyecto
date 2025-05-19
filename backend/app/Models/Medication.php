<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Medication extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre',
        'descripcion',
        'dosis',
        'frecuencia',
        'duracion',
        'tipo',
        'producto_id',
        'treatment_products',
    ];

    protected $casts = [
        'fecha_inicio' => 'datetime',
        'fecha_fin' => 'datetime'
    ];

    // Relaciones
    public function treatments()
    {
        return $this->belongsToMany(Treatment::class, 'treatment_products')
                    ->withPivot('cantidad'); // Si necesitas la cantidad
    }

    public function products()
    {
        return $this->belongsTo(Product::class, 'producto_id');
    }
} 