help: ## Display help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start: ## Start containers
	@docker-compose up -d


prod-build: ## Build Prod Things
	@cd src && \
	npm run dist && \
	cd ../server && \
	GOOS=linux go build -o ./../bin/pocketpenguin main.go