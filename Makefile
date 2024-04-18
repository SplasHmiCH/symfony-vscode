.SILENT:
.PHONY: build

## Colors
COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m
COLOR_COMMENT = \033[33m

## Show Help
help:
	printf "${COLOR_COMMENT}Usage:${COLOR_RESET}\n"
	printf " make [target]\n\n"
	printf "${COLOR_COMMENT}Available targets:${COLOR_RESET}\n"
	awk '/^[a-zA-Z-]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)


##########
# Docker #
##########

## Install the project (this must only be done once)
install:
	echo "Starting temporary shopware instance"
	$(eval CONTAINER_ID=$(shell sh -c 'docker run -d dockware/dev:6.4.20.2'))

	echo "Copying source code into src"
	docker cp "${CONTAINER_ID}:/var/www/html/." ./demo-data

	echo "Shutting down temporary container"
	docker kill "${CONTAINER_ID}"
	docker rm "${CONTAINER_ID}"