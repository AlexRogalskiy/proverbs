#!/bin/sh

set -e

cd ..

# Build docker images
GIT_SHA=$(git rev-parse HEAD)
docker build -f Dockerfile --build-arg TOKEN=$1 -t styled-proverbs -t styled-proverbs:$GIT_SHA --build-arg TOKEN=$VERCEL_TOKEN .
