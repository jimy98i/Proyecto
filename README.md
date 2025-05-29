# Proyecto Veterinaria

Este proyecto es una aplicación completa para la gestión de una clínica veterinaria. Incluye un backend desarrollado en Laravel, un frontend en React y un entorno de desarrollo configurado con contenedores Docker. A continuación, se detalla la estructura del proyecto, los servicios incluidos y su funcionalidad.

---

## Estructura del Proyecto

El proyecto está organizado en los siguientes directorios principales:

- **backend/**: Contiene el código del servidor desarrollado en Laravel.
- **frontend/**: Contiene el código del cliente desarrollado en React.
- **nginx/**: Configuración del servidor web Nginx.
- **database/**: Archivos relacionados con la base de datos, como scripts de inicialización.
- **docker-compose.yml**: Archivo de configuración para orquestar los contenedores Docker.

---

## Servicios en Docker Compose

El entorno de desarrollo está compuesto por los siguientes servicios:

### 1. **Backend**
- **Contexto**: `./backend`
- **Dockerfile**: `backend/Dockerfile`
- **Puertos**: `8000:8000`
- **Variables de Entorno**:
  - `APP_ENV=production`
  - `APP_DEBUG=false`
  - `DB_HOST=mysql`
  - `DB_DATABASE=veterinaria`
  - `DB_USERNAME=admin`
  - `DB_PASSWORD=admin`
- **Volúmenes**:
  - `./backend:/var/www`
- **Dependencias**:
  - Depende del servicio `mysql`.

### 2. **Frontend**
- **Contexto**: `./frontend`
- **Dockerfile**: `frontend/Dockerfile`
- **Puertos**: `5173:5173`
- **Comando**: `npm run dev -- --host`
- **Volúmenes**:
  - `./frontend:/app`
  - `/app/node_modules`
- **Dependencias**:
  - Depende del servicio `backend`.

### 3. **MySQL**
- **Imagen**: `mysql:8.0`
- **Puertos**: `3306:3306`
- **Variables de Entorno**:
  - `MYSQL_ROOT_PASSWORD=root`
  - `MYSQL_DATABASE=veterinaria`
  - `MYSQL_USER=admin`
  - `MYSQL_PASSWORD=admin`
- **Volúmenes**:
  - `database:/var/lib/mysql`

### 4. **phpMyAdmin**
- **Imagen**: `phpmyadmin/phpmyadmin`
- **Puertos**: `8081:80`
- **Variables de Entorno**:
  - `PMA_HOST=mysql`
  - `PMA_USER=admin`
  - `PMA_PASSWORD=admin`
- **Dependencias**:
  - Depende del servicio `mysql`.

---

## Funcionalidad del Proyecto

### Backend
- **Framework**: Laravel.
- **Características**:
  - Gestión de usuarios, mascotas, citas, historiales médicos, y más.
  - Envío de correos electrónicos para confirmación de citas.
  - API REST para interactuar con el frontend.

### Frontend
- **Framework**: React.
- **Características**:
  - Interfaz de usuario para clientes y administradores.
  - Gestión de citas y visualización de historiales médicos.
  - Integración con la API del backend.

### Base de Datos
- **Motor**: MySQL.
- **Gestión**:
  - phpMyAdmin para administración visual.
  - Scripts de inicialización en `backend/database/init.sql`.

---

## Cómo Iniciar el Proyecto

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd Proyecto_Veterinaria
   ```

2. **Iniciar los contenedores Docker**:
   ```bash
   docker-compose up --build
   ```

3. **Acceder a los servicios**:
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend**: [http://localhost:8000](http://localhost:8000)
   - **phpMyAdmin**: [http://localhost:8081](http://localhost:8081)

---

## Scripts de Inicialización

El archivo `backend/database/init.sql` contiene scripts para inicializar la base de datos con datos de ejemplo.

---

## Notas Adicionales

- **Configuración de Correo**:
  - El backend utiliza Mailtrap para pruebas de correo. Asegúrate de configurar las credenciales en el archivo `.env`.

- **Depuración**:
  - Logs del backend disponibles en `storage/logs/`.
  - Logs de Docker accesibles con `docker logs <NOMBRE_DEL_CONTENEDOR>`.

--- 

## Créditos y Licencia

Desarrollado por Jaime Lobon Villanueva. Uso educativo.

Este proyecto está licenciado bajo una Licencia Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0).

[![Licencia CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)

Puedes copiar, redistribuir, mezclar, transformar y construir a partir del material, siempre que se dé crédito, no se use con fines comerciales y las nuevas creaciones se licencien bajo los mismos términos.

---