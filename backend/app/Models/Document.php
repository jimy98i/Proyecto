<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'linea_historial_id',
        'historial_id',
        'nombre_documento',
        'tipo_documento',
        'url_documento',
        'fecha_creacion',
        'descripcion'
    ];

    protected $casts = [
        'fecha_creacion' => 'datetime'
    ];

    // Relaciones
    public function historyLine()
    {
        return $this->belongsTo(HistoryLine::class, 'linea_historial_id');
    }

    public function history()
    {
        return $this->belongsTo(History::class, 'historial_id');
    }
} 