############################################################################
# Variables
############################################################################

# Since we rely on paths relative to the makefile location, abort if make isn't being run from there.
$(if $(findstring /,$(MAKEFILE_LIST)),$(error Please only invoke this makefile from the directory it resides in))

# SHELL stores the shell that the Makefile uses.
SHELL := /bin/bash -o errexit -o nounset

# disable docker BuildKit option
DOCKER_BUILDKIT=0
# disable docker cli build option
COMPOSE_DOCKER_CLI_BUILD=0

# UNAME_OS stores the value of uname -s.
UNAME_OS := $(shell uname -s)
# UNAME_ARCH stores the value of uname -m.
UNAME_ARCH := $(shell uname -m | sed s/x86_64/amd64/ | sed s/aarch64/arm64/ | sed s/aarch64_be/arm64/)
# ROOT_DIR stores git root directory
ROOT_DIR := $(shell git rev-parse --show-toplevel)
# ORIGINAL_BRANCH stores git branch name
ORIGINAL_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
# GIT_SHA stores git last commit hash
GIT_SHA := $(shell git rev-parse HEAD)

IMAGE ?= styled-proverbs
TAG ?= latest

# Set V=1 on the command line to turn off all suppression. Many trivial
# commands are suppressed with "@", by setting V=1, this will be turned off.
ifeq ($(V),1)
	AT :=
else
	AT := @
endif

# if this session isn't interactive, then we don't want to allocate a
# TTY, which would fail, but if it is interactive, we do want to attach
# so that the user can send e.g. ^C through.
INTERACTIVE := $(shell [ -t 0 ] && echo 1 || echo 0)
ifeq ($(INTERACTIVE), 1)
	DOCKER_FLAGS += -t
endif

UTILS := docker
# Make sure that all required utilities can be located.
UTIL_CHECK := $(or $(shell which $(UTILS) >/dev/null && echo 'ok'),$(error Did you forget to install `docker` after cloning the repo? At least one of the required supporting utilities not found: $(UTILS)))

# Run all by default when "make" is invoked.
.DEFAULT_GOAL := help

############################################################################
# Common
############################################################################

# Default target (by virtue of being the first non '.'-prefixed in the file).
.PHONY: _no-target-specified
_no-target-specified:
	$(error Please specify the target to make - `make list` shows targets)

# Ensure docker token command.
.PHONY: _ensure-token
_ensure-token:
ifndef TOKEN
	$(error Please invoke with `make TOKEN=<token> docker-build`)
endif

# Ensures that the git workspace is clean.
.PHONY: _ensure-clean
_ensure-clean:
	@[ -z "$$((git status --porcelain --untracked-files=no || echo err) | command grep -v 'CHANGELOG.md')" ] || { echo "Workspace is not clean; please commit changes first." >&2; exit 2; }

# Lists all targets defined in this makefile.
.PHONY: list
list:
	@$(MAKE) -pRrn : -f $(MAKEFILE_LIST) 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | command grep -v -e '^[^[:alnum:]]' -e '^$@$$command ' | sort

# Run information command with target descriptions.
.PHONY: help
##= diff: to show modified files
##= docker-build: to build docker image
##= docker-clean: to remove docker container
##= docker-lint: to lint docker image
##= docker-list: to list docker images
##= docker-rebuild: to rebuild docker image
##= docker-remove: to remove docker container
##= docker-remove-all: to remove all docker images
##= docker-start: to start docker container
##= docker-stop: to stop docker container
##= help: to list all make targets with descriptions
##= info: to gather environment information
##= list: to list all make targets
##= tilt-start: to start k8s cluster
##= tilt-stop: to stop k8s cluster
help:
	@echo
	@echo
	@echo "Please use [make <target>] where <target> is one of:"
	@echo
	$(AT)sed -n 's/^##=//p' $(MAKEFILE_LIST) 2>/dev/null | column -t -s ':' |  sed -e 's/^/ /'
	@echo
	@echo

## Show information about the runtime environment
.PHONY: info
info:
	@echo
	@echo
	$(AT)echo "user: $$(whoami)"; \
	$(AT)echo "directory: $$(pwd)"; \
	$(AT)echo "ls -ahl: $$(ls -ahl)"; \
	docker images; \
	docker ps
	@echo
	@echo

# Run docker build command.
.PHONY: docker-build
docker-build: _ensure-token _ensure-clean
	docker build --rm --platform=linux/$(UNAME_ARCH) -f Dockerfile -t $(IMAGE):$(TAG) -t "$(IMAGE):$(GIT_SHA)" --build-arg VERCEL_TOKEN=$(TOKEN) .

# Run docker rebuild command.
.PHONY: docker-rebuild
docker-rebuild: _ensure-token _ensure-clean
	docker build --rm --platform=linux/$(UNAME_ARCH) -f Dockerfile -t "$(IMAGE):$(TAG)" -t "$(IMAGE):$(GIT_SHA)" --build-arg VERCEL_TOKEN=$(TOKEN) --no-cache=true .

# Run docker list command.
.PHONY: docker-list
docker-list:
	docker container list --filter name="$(IMAGE)" --format '{{ .ID }}'

# Run docker remove container command.
.PHONY: docker-remove
docker-remove:
	docker container rm --force "$(IMAGE)" > /dev/null

# Run docker remove all images command.
.PHONY: docker-remove-all
docker-remove-all:
	docker images | grep $(IMAGE) | awk '{print $3}' | xargs docker rmi -f

# Run docker lint command.
.PHONY: docker-lint
docker-lint:
	docker run -it --rm --platform=linux/amd64 --privileged -v `pwd`:/root/ \
         projectatomic/dockerfile-lint \
         dockerfile_lint -f Dockerfile -r ./default_rules.yaml

# Run docker clean command.
.PHONY: docker-clean
docker-clean: docker-stop docker-remove

# Run docker start command.
.PHONY: docker-start
docker-start:
	docker-compose -f docker-compose.yml up -d --force-recreate

# Run docker stop command.
.PHONY: docker-stop
docker-stop:
	docker-compose -f docker-compose.yml down -v --remove-orphans

# Run tilt start command.
.PHONY: tilt-start
tilt-start:
	tilt up

# Run tilt stop command.
.PHONY: tilt-stop
tilt-stop:
	tilt down --delete-namespaces

# Run git diff command.
.PHONY: diff
diff:
	$(AT)git diff --diff-filter=d --name-only
