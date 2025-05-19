<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Treatment extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'historial_id',
        'descripcion',
        'fecha_inicio',
        'fecha_fin',
        'estado',
    ];

    protected $casts = [
        'fecha_inicio' => 'datetime',
        'fecha_fin' => 'datetime'
    ];

    // Relaciones
    public function history()
    {
        return $this->belongsTo(History::class, 'historial_id');
    }

    public function medications()
    {
        return $this->belongsToMany(Medication::class, 'treatment_products')
                    ->withPivot('cantidad');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'treatment_products')
                    ->withPivot('cantidad');
    }
} 