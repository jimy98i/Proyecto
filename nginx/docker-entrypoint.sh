#!/bin/sh
set -e

# Si estamos en producción, usar la configuración de producción
if [ "$APP_ENV" = "production" ]; then
    echo "Using production configuration"
    cp /etc/nginx/nginx.prod.conf /etc/nginx/nginx.conf
else
    echo "Using development configuration"
fi

# Ejecutar el comando original
exec "$@" 