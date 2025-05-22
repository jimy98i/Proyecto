FROM nginx:1.25

# Copiar ambas configuraciones
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.prod.conf /etc/nginx/nginx.prod.conf

# Script para seleccionar la configuración correcta
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"] 