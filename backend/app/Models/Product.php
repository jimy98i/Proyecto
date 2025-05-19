<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'categoria',
        'fecha_vencimiento',
        'proveedor_id',
        'codigo_barras',
    ];

    // Relaciones
    public function treatments()
    {
        return $this->belongsToMany(Treatment::class, 'treatment_products')
                    ->withPivot('cantidad'); // Si necesitas la cantidad
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class, 'proveedor_id');
    }
    public function medication()
    {
        return $this->belongsTo(Medication::class, 'product_id');
    }
} 