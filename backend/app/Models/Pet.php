<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pet extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre',
        'tipo',
        'raza',
        'edad',
        'peso',
        'fecha_nacimiento',
        'dueno_id'
    ];

    protected $casts = [
        'edad' => 'integer',
        'peso' => 'decimal:2',
        'fecha_nacimiento' => 'date'
    ];

    // Relaciones
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id', 'usuario_id');
    }

    public function history()
    {
        return $this->hasOne(History::class, 'mascota_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'mascota_id');
    }
} 