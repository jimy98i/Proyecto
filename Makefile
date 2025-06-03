# Nombre del proyecto
PROJECT_NAME = veterinaria

# ========== COMANDOS BÁSICOS ==========

up:
	docker compose -f docker-compose.yml up --build -d

down:
	docker compose -f docker-compose.yml down

restart:
	$(MAKE) down
	$(MAKE) up

logs:
	docker compose logs -f

# ========== SHELL EN CONTENEDORES ==========

bash-backend:
	docker compose exec backend bash

bash-frontend:
	docker compose exec frontend sh

bash-db:
	docker compose exec mysql bash

# ========== LARAVEL ==========

migrate:
	docker compose exec backend php artisan migrate

seed:
	docker compose exec backend php artisan db:seed

optimize:
	docker compose exec backend php artisan optimize:clear

key-generate:
	docker compose exec backend php artisan key:generate

composer-install:
	docker compose exec backend composer install

artisan:
	docker compose exec backend php artisan

# ========== FRONTEND ==========

npm-install:
	docker compose exec frontend npm install

npm-dev:
	docker compose exec frontend npm run dev

npm-build:
	docker compose exec frontend npm run build

npm-clean:

	docker compose exec frontend rm -rf node_modules dist