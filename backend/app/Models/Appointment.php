<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    protected $table = 'appointments';
    protected $primaryKey = 'id';

    protected $fillable = [
        'linea_historial_id',
        'fecha_cita',
        'hora_cita',
        'tipo_cita',
        'estado',
        'notas',
        'user_id'
    ];

    protected $casts = [
        'fecha_cita' => 'date:Y-m-d', // Formato solo de fecha
        'hora_cita' => 'datetime:H:i' // Cambiar a datetime y formatear manualmente
    ];

    public function getHoraCitaAttribute($value)
    {
        return date('H:i', strtotime($value)); // Formatear manualmente la hora
    }

    public function historyLine(): BelongsTo
    {
        return $this->belongsTo(HistoryLine::class, 'linea_historial_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}