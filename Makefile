# Nombre del proyecto
PROJECT_NAME = veterinaria

# ========== COMANDOS BÁSICOS ==========

up:
	docker compose -f docker-compose.yml up --build

up-prod:
	docker compose -f docker-compose.prod.yml up --build -d

down:
	docker compose -f docker-compose.yml down

down-prod:
	docker compose -f docker-compose.prod.yml down

restart:
	$(MAKE) down
	$(MAKE) up

restart-prod:
	$(MAKE) down-prod
	$(MAKE) up-prod

logs:
	docker compose logs -f

logs-prod:
	docker compose -f docker-compose.yml logs -f

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

# ========== APERTURA DE INTERFACES ==========

phpmyadmin:
	open http://localhost:8080

app:
	open http://localhost

.PHONY: up up-prod down down-prod restart restart-prod logs logs-prod \
        bash-backend bash-frontend bash-db \
        migrate seed optimize key-generate composer-install artisan \
        npm-install npm-dev npm-build npm-clean \
        phpmyadmin app
