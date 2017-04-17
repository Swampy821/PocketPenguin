help: ## Display help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init-setup: ## Run setup
	@bash setup/setup.sh
	@cd src && npm install

run-server: ## Run Go Server
	@cd server && go run main.go

run-frontend: ## Run Frontend dev-server
	@cd src && npm start


start-db: ## Start mongo container
	@docker-compose up -d


prod-build: ## Build Prod Bundle and binary file
	@cd src && \
	npm run dist && \
	cd ../server && \
	GOOS=linux go build -o ./../bin/pocketpenguin main.go