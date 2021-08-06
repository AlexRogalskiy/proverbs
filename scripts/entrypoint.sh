#!/bin/sh

set -e

export VERCEL_TOKEN=`cat /run/secrets/vercel_token`

npm run develop:docker
