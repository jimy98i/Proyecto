<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class History extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'mascota_id',
        'fecha_creacion',
        'descripcion_cliente'
    ];

    protected $casts = [
        'fecha_creacion' => 'datetime'
    ];

    // Relaciones
    public function pet()
    {
        return $this->belongsTo(Pet::class, 'mascota_id');
    }

    public function historyLines()
    {
        return $this->hasMany(HistoryLine::class, 'historial_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'historial_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'historial_id');
    }
} 