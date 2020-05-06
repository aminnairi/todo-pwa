.PHONY: start stop restart development production

start:
	docker-compose up --detach nginx json-server

stop:
	docker-compose down --remove-orphans --volumes

restart: stop start

development:
	docker-compose run --rm yarn development

production:
	docker-compose run --rm yarn production
