/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: veterinaria
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `linea_historial_id` bigint unsigned DEFAULT NULL,
  `fecha_cita` date NOT NULL,
  `hora_cita` time NOT NULL,
  `tipo_cita` enum('consulta','revisión','urgencia','vacunación','operación') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` enum('programada','confirmada','cancelada','completada') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notas` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `appointments_linea_historial_id_foreign` (`linea_historial_id`),
  KEY `appointments_user_id_foreign` (`user_id`),
  CONSTRAINT `appointments_linea_historial_id_foreign` FOREIGN KEY (`linea_historial_id`) REFERENCES `history_lines` (`id`) ON DELETE CASCADE,
  CONSTRAINT `appointments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES
(1,1,'2025-05-01','10:00:00','consulta','programada','Consulta de rutina','2025-05-30 16:30:41','2025-05-30 16:30:41',1),
(2,2,'2025-05-02','11:00:00','vacunación','programada','Vacunación de refuerzo','2025-05-30 16:30:41','2025-05-30 16:30:41',2);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `historial_id` bigint unsigned NOT NULL,
  `tipo_documento` enum('analisis','radiografia','ecografia','historial','otro') COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre_archivo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ruta_archivo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_subida` timestamp NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `documents_historial_id_foreign` (`historial_id`),
  CONSTRAINT `documents_historial_id_foreign` FOREIGN KEY (`historial_id`) REFERENCES `histories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES
(1,1,'radiografia','radiografia_fido.jpg','/documents/radiografia_fido.jpg','2025-05-30 16:30:41','Radiografía de Fido','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(2,2,'analisis','analisis_mittens.pdf','/documents/analisis_mittens.pdf','2025-05-30 16:30:41','Análisis de Mittens','2025-05-30 16:30:41','2025-05-30 16:30:41');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `histories`
--

DROP TABLE IF EXISTS `histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `histories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `mascota_id` bigint unsigned NOT NULL,
  `fecha_creacion` timestamp NOT NULL,
  `descripcion_cliente` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` enum('activo','inactivo') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `histories_mascota_id_foreign` (`mascota_id`),
  CONSTRAINT `histories_mascota_id_foreign` FOREIGN KEY (`mascota_id`) REFERENCES `pets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `histories`
--

LOCK TABLES `histories` WRITE;
/*!40000 ALTER TABLE `histories` DISABLE KEYS */;
INSERT INTO `histories` VALUES
(1,1,'2025-05-30 16:30:41','Consulta general','activo','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(2,2,'2025-05-30 16:30:41','Vacunación','activo','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(3,3,'2025-05-30 16:30:41','Vacunación','activo','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(4,4,'2025-05-30 16:30:41','Vacunación','activo','2025-05-30 16:30:41','2025-05-30 16:30:41');
/*!40000 ALTER TABLE `histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history_lines`
--

DROP TABLE IF EXISTS `history_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `history_lines` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `historial_id` bigint unsigned NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` date NOT NULL,
  `estado` enum('activo','inactivo') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `history_lines_historial_id_foreign` (`historial_id`),
  CONSTRAINT `history_lines_historial_id_foreign` FOREIGN KEY (`historial_id`) REFERENCES `histories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_lines`
--

LOCK TABLES `history_lines` WRITE;
/*!40000 ALTER TABLE `history_lines` DISABLE KEYS */;
INSERT INTO `history_lines` VALUES
(1,1,'Línea de historial 1','2025-05-30','activo','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(2,2,'Línea de historial 2','2025-05-30','activo','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(3,3,'Línea de historial 2','2025-05-30','activo','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(4,4,'Línea de historial 2','2025-05-30','activo','2025-05-30 16:30:41','2025-05-30 16:30:41');
/*!40000 ALTER TABLE `history_lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medications`
--

DROP TABLE IF EXISTS `medications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `medications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `dosis` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `frecuencia` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duracion` int NOT NULL,
  `tipo` enum('oral','inyectable','topico') COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medications_product_id_foreign` (`product_id`),
  CONSTRAINT `medications_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medications`
--

LOCK TABLES `medications` WRITE;
/*!40000 ALTER TABLE `medications` DISABLE KEYS */;
INSERT INTO `medications` VALUES
(1,'Amoxicilina','Antibiótico para infecciones','500mg','Cada 12 horas',7,'oral',1,'2025-05-30 16:30:41','2025-05-30 16:30:41'),
(2,'Vacuna Parvovirus','Vacuna para prevenir parvovirus en perros','1 dosis','Anual',1,'inyectable',2,'2025-05-30 16:30:41','2025-05-30 16:30:41');
/*!40000 ALTER TABLE `medications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES
(1,'0001_01_01_000000_create_users_table',1),
(2,'0001_01_01_000001_create_cache_table',1),
(3,'0001_01_01_000002_create_jobs_table',1),
(4,'2025_03_22_000004_create_pets_table',1),
(5,'2025_03_22_000005_create_histories_table',1),
(6,'2025_03_22_000006_create_history_lines_table',1),
(7,'2025_03_22_000007_create_documents_table',1),
(8,'2025_03_22_000008_create_appointments_table',1),
(9,'2025_03_22_000009_create_treatments_table',1),
(10,'2025_03_22_000010_create_providers_table',1),
(11,'2025_03_22_000011_create_products_table',1),
(12,'2025_03_22_000012_create_medications_table',1),
(13,'2025_03_22_000013_create_treatment_products_table',1),
(14,'2025_05_08_162131_create_personal_access_tokens_table',1),
(15,'2025_05_12_171929_add_user_id_to_appointments_table',1),
(16,'2025_05_20_190425_add_foto_to_users_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` enum('perro','gato','otro') COLLATE utf8mb4_unicode_ci NOT NULL,
  `raza` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `edad` int NOT NULL,
  `peso` decimal(8,2) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `dueno_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pets_dueno_id_foreign` (`dueno_id`),
  CONSTRAINT `pets_dueno_id_foreign` FOREIGN KEY (`dueno_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES
(1,'Fido','perro','Labrador',3,30.50,'2019-01-01',3,'2025-05-30 16:30:41','2025-05-30 16:30:41'),
(2,'Mittens','gato','Siames',2,4.50,'2020-05-01',4,'2025-05-30 16:30:41','2025-05-30 16:30:41'),
(3,'Minino','gato','Siames',2,4.50,'2020-05-01',5,'2025-05-30 16:30:41','2025-05-30 16:30:41'),
(4,'Musi','gato','Siames',2,4.50,'2020-05-01',6,'2025-05-30 16:30:41','2025-05-30 16:30:41');
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `stock` int NOT NULL,
  `categoria` enum('medicamento','alimento','accesorio','higiene','otro') COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `proveedor_id` bigint unsigned NOT NULL,
  `codigo_barras` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_codigo_barras_unique` (`codigo_barras`),
  KEY `products_proveedor_id_foreign` (`proveedor_id`),
  CONSTRAINT `products_proveedor_id_foreign` FOREIGN KEY (`proveedor_id`) REFERENCES `providers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
(1,'Antibiótico','Antibiótico de amplio espectro',15.99,100,'medicamento','2023-12-31',1,'1234567890123','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(2,'Comida para perros','Comida balanceada para perros',25.50,50,'alimento','2024-06-30',2,'9876543210987','2025-05-30 16:30:41','2025-05-30 16:30:41');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES
(1,'Proveedor 1','123456789','Calle Falsa 123','proveedor1@example.com','2025-05-30 16:30:40','2025-05-30 16:30:40'),
(2,'Proveedor 2','987654321','Avenida Siempre Viva 742','proveedor2@example.com','2025-05-30 16:30:40','2025-05-30 16:30:40');
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_products`
--

DROP TABLE IF EXISTS `treatment_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment_products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `treatment_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `cantidad` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `treatment_products_treatment_id_foreign` (`treatment_id`),
  KEY `treatment_products_product_id_foreign` (`product_id`),
  CONSTRAINT `treatment_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `treatment_products_treatment_id_foreign` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_products`
--

LOCK TABLES `treatment_products` WRITE;
/*!40000 ALTER TABLE `treatment_products` DISABLE KEYS */;
INSERT INTO `treatment_products` VALUES
(1,1,2,3,NULL,NULL),
(2,1,1,5,NULL,NULL),
(3,2,2,2,NULL,NULL),
(4,2,1,4,NULL,NULL),
(5,3,2,5,NULL,NULL),
(6,4,1,1,NULL,NULL),
(7,5,1,4,NULL,NULL),
(8,5,2,2,NULL,NULL),
(9,6,1,5,NULL,NULL),
(10,6,2,3,NULL,NULL),
(11,7,2,5,NULL,NULL),
(12,7,1,2,NULL,NULL),
(13,8,1,2,NULL,NULL),
(14,8,2,1,NULL,NULL),
(15,9,1,4,NULL,NULL),
(16,9,2,3,NULL,NULL),
(17,10,1,5,NULL,NULL),
(18,10,2,5,NULL,NULL);
/*!40000 ALTER TABLE `treatment_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatments`
--

DROP TABLE IF EXISTS `treatments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `historial_id` bigint unsigned NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado` enum('activo','completado','cancelado') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `treatments_historial_id_foreign` (`historial_id`),
  CONSTRAINT `treatments_historial_id_foreign` FOREIGN KEY (`historial_id`) REFERENCES `histories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatments`
--

LOCK TABLES `treatments` WRITE;
/*!40000 ALTER TABLE `treatments` DISABLE KEYS */;
INSERT INTO `treatments` VALUES
(1,1,'Tratamiento 1 para Fido','2025-05-30','2025-06-16','activo','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(2,2,'Tratamiento 1 para Mittens','2025-05-30','2025-06-07','activo','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(3,2,'Tratamiento 2 para Mittens','2025-05-30','2025-06-14','completado','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(4,2,'Tratamiento 3 para Mittens','2025-05-30','2025-06-20','cancelado','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(5,3,'Tratamiento 1 para Minino','2025-05-30','2025-06-18','activo','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(6,3,'Tratamiento 2 para Minino','2025-05-30','2025-06-19','cancelado','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(7,3,'Tratamiento 3 para Minino','2025-05-30','2025-06-10','completado','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(8,4,'Tratamiento 1 para Musi','2025-05-30','2025-06-18','completado','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(9,4,'Tratamiento 2 para Musi','2025-05-30','2025-06-15','activo','2025-05-30 16:30:41','2025-05-30 16:30:41'),
(10,4,'Tratamiento 3 para Musi','2025-05-30','2025-06-07','activo','2025-05-30 16:30:41','2025-05-30 16:30:41');
/*!40000 ALTER TABLE `treatments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rol` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Admin User','admin@example.com','$2y$12$2KYoeIV/SLBTmUKikocjT.pqxPM1l6j4Vy0fiTWEAHmOatDKrXKkm','Calle Admin 123',NULL,'123456789','admin',NULL,NULL,'2025-05-30 16:30:40','2025-05-30 16:30:40'),
(2,'Veterinarian User','vet@example.com','$2y$12$.s6m.krZ5HREcwgnFk1NUua.IUjGgjfDSLKbuyXSXfOwuM.mS21d6','Calle Veterinario 456',NULL,'987654321','veterinario',NULL,NULL,'2025-05-30 16:30:40','2025-05-30 16:30:40'),
(3,'Client User','client@example.com','$2y$12$vgg0asWK.9KH9jOkoMQDzuWwCBxLloDFit58WyCrsuCDfxG50jWXS','Calle Cliente 789',NULL,'555555555','cliente',NULL,NULL,'2025-05-30 16:30:41','2025-05-30 16:30:41'),
(4,'Client User2','client2@example.com','$2y$12$WstU6lLwnl2x0I65VfsefenGATQyBCbhiIcqYlg6YERjjSTpyAkOG','Calle Cliente 789',NULL,'555555555','cliente',NULL,NULL,'2025-05-30 16:30:41','2025-05-30 16:30:41'),
(5,'Client User3','client3@example.com','$2y$12$3NMjZFHlj6gI/5L4.N.Dy.jePKttWC6ShM/6zRVuojuve.Cenq.9W','Calle Cliente 789',NULL,'555555555','cliente',NULL,NULL,'2025-05-30 16:30:41','2025-05-30 16:30:41'),
(6,'Client User4','client4@example.com','$2y$12$mYamFmzD09phhGaEYsGswuP6CSqpITyNpVbsEJhliOZi8hA9V0ES6','Calle Cliente 789',NULL,'555555555','cliente',NULL,NULL,'2025-05-30 16:30:41','2025-05-30 16:30:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'veterinaria'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-05-30 18:37:09
