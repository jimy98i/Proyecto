<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Cita Confirmada</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f8fafc; color: #222; }
        .container { background: #fff; border-radius: 8px; padding: 24px; margin: 24px auto; max-width: 500px; box-shadow: 0 2px 8px #eee; }
        .header { color: #2d8f6f; font-size: 1.5em; margin-bottom: 16px; }
        .footer { margin-top: 32px; font-size: 0.9em; color: #888; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">¡Tu cita ha sido confirmada!</div>
        <p>Hola {{ $user->nombre }},</p>
        <p>Te informamos que tu cita en <b>{{ config('app.name') }}</b> ha sido <b>confirmada</b> por nuestro equipo.</p>
        <ul>
            <li><b>Fecha:</b> {{ \Carbon\Carbon::parse($appointment->fecha_cita)->format('d/m/Y') }}</li>
            <li><b>Hora:</b> {{ $appointment->hora_cita }}</li>
            <li><b>Tipo de cita:</b> {{ $appointment->tipo_cita }}</li>
        </ul>
        <p>Por favor, acude con puntualidad. Si necesitas reprogramar o cancelar, contáctanos con antelación.</p>
        <div class="footer">
            Gracias por confiar en {{ config('app.name') }}.<br>
            <b>Veterinaria Happy Friends</b>
        </div>
    </div>
</body>
</html>
