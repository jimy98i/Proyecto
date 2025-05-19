<?php

namespace App\Http\Requests\Appointment;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAppointmentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'linea_historial_id' => 'nullable|exists:history_lines,id',
            'fecha_cita' => 'sometimes|date|after_or_equal:today',
            'hora_cita' => 'sometimes|date_format:H:i',
            'tipo_cita' => 'sometimes|string|in:consulta,revisión,urgencia,vacunación,operación',
            'estado' => 'sometimes|string|in:programada,confirmada,cancelada,completada',
            'notas' => 'nullable|string'
        ];
    }

    public function messages()
    {
        return [
            'linea_historial_id.exists' => 'La línea de historial seleccionada no existe',
            'fecha_cita.date' => 'La fecha de la cita debe ser una fecha válida',
            'fecha_cita.after_or_equal' => 'La fecha de la cita no puede ser anterior a hoy',
            'hora_cita.date_format' => 'La hora de la cita debe tener el formato HH:mm',
            'tipo_cita.in' => 'El tipo de cita debe ser uno de: consulta, revisión, urgencia, vacunación, operación',
            'estado.in' => 'El estado debe ser uno de: programada, confirmada, cancelada, completada'
        ];
    }
} 