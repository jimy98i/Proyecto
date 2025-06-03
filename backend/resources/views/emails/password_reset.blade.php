<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Recuperación de contraseña</title>
</head>
<body>
    <h2>Hola {{ $user->nombre ?? $user->name ?? $user->email }},</h2>
    <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
    <p>Tu nueva contraseña temporal es:</p>
    <p style="font-size: 1.5em; font-weight: bold; color: #2c3e50;">{{ $temporaryPassword }}</p>
    <p>Por seguridad, deberás cambiar esta contraseña al iniciar sesión.</p>
    <p>Si no solicitaste este cambio, ignora este correo.</p>
    <br>
    <p>Saludos,<br>El equipo de la Veterinaria</p>
</body>
</html>
