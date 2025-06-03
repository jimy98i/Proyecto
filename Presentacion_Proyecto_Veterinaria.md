---
title: "Sistema Web para Gestión de Clínica Veterinaria"
author: "[Tu Nombre]"
date: "03/06/2025"
---

# Título

**Nombre del Proyecto:** Sistema Web para Gestión de Clínica Veterinaria  
**Tecnologías:** Laravel (Backend), React + Vite (Frontend), Docker + Nginx  
**Autor:** [Tu Nombre]

---

# Introducción

- Solución integral para la gestión de clínicas veterinarias.
- Arquitectura desacoplada (Frontend + Backend).
- Compatible con Docker y despliegue tradicional.
- Módulos: usuarios, mascotas, citas, historiales, productos y notificaciones.

---

# Objetivos del Proyecto

- Digitalizar la gestión de clientes, mascotas y citas.
- UI intuitiva y profesional.
- Roles: Cliente, Veterinario, Administrador.
- Eficiencia administrativa y mejor atención.

---

# Funcionalidades Clave

- Autenticación de usuarios con tokens.
- Alta, edición y baja de mascotas.
- Calendario interactivo para citas, con historial asociado.
- Visualización de historiales médicos.
- Panel de administración para gestión global.
- Notificaciones y alertas UI según respuesta de API.
- API RESTful segura y desacoplada.

---

# Evaluación de Soluciones

- Monolítico: descartado (poca flexibilidad).
- Microservicios: descartado (demasiado complejo).
- **Elegido:** Web modular con backend RESTful + frontend desacoplado, desplegada con Docker.

---

# Justificación de la Solución

- Escalabilidad y mantenimiento sencillo.
- Separación de responsabilidades.
- Docker + Nginx para portabilidad y robustez.
- Preparado para despliegue en AWS (Ubuntu).

---

# Requisitos del Sistema

- **Hardware:** 4GB RAM, 2 CPUs, 20GB de almacenamiento.
- **Backend:** PHP 8.2, Laravel 12, Composer, MySQL 8.
- **Frontend:** Node.js 18+, React, Vite, Bootstrap.
- **Infraestructura:** Docker, Docker Compose, Nginx.

---

# Diseño de Software

**Backend (Laravel):**
- Modelos: User, Pet, Appointment, Treatment...
- Controladores RESTful
- Middleware, requests y seeders
- Autenticación con Sanctum

**Frontend (React):**
- Componentes reutilizables
- Gestión de estado con Context API
- Integración con API REST
- Interfaz responsiva con Bootstrap

**Despliegue:** Docker Compose, Nginx, Makefile

---

# Endpoints Principales (API)

- `/api/user` (GET, POST, PUT, DELETE)
- `/api/users/clients/cliente`
- `/api/pet`
- `/api/appointment`
- `/api/treatment`
- `/api/login`, `/api/register`, `/api/logout`

---

# Observaciones y Mejoras

- Rol cliente forzado en creación.
- Falta filtro por DNI.
- Sin paginación de clientes.
- Validaciones no estándar.
- Manejo de errores mejorable.

---

# Fase de Pruebas

- Enfoque prueba-error durante el desarrollo.
- Sin pruebas unitarias por tiempo/alcance.
- Adaptación constante de controladores.

---

# Manual de Uso - Instalación

**Requisitos:** Docker y Docker Compose.

**Pasos:**
- Clonar repositorio rama dev
- Ejecutar `make up`
- Acceder a:
    - Frontend: http://localhost:5173
    - Backend: http://localhost:8000
    - Producción: http://localhost:80 (rama produc)
- Comandos:
    - `make migrate`, `make seed`, `make logs`

---

# Manual de Cliente y Administrador

**Cliente:**
- Login, gestión de mascotas, citas e historial.

**Administrador:**
- Gestión de usuarios, citas, historiales.

---

# Conclusiones Finales

- Proyecto orientado a ERP libre para veterinarias.
- Adaptable a protectoras o control de tienda.
- Sistema funcional, sencillo y en evolución.

---

# Gracias

Contacto / GitHub / Preguntas
