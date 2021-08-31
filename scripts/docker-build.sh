#!/bin/sh

set -e

cd "$(dirname "$0")" || exit 1

# Build docker images
GIT_SHA=$(git rev-parse HEAD)
docker build -f Dockerfile -t styled-proverbs -t styled-quotes:$GIT_SHA --build-arg VERCEL_TOKEN=$1 .
