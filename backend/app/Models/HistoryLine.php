<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HistoryLine extends Model
{
    protected $table = 'history_lines';
    protected $primaryKey = 'id';

    protected $fillable = [
        'historial_id',
        'descripcion',
        'fecha',
        'estado'
    ];

    protected $casts = [
        'fecha' => 'date'
    ];

    public function history(): BelongsTo
    {
        return $this->belongsTo(History::class, 'historial_id');
    }

    public function treatments(): HasMany
    {
        return $this->hasMany(Treatment::class, 'linea_historial_id');
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'linea_historial_id', 'id');
    }
} 