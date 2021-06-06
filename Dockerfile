## Setting base OS layer
## docker build -t container_tag --build-arg IMAGE_SOURCE=node IMAGE_TAG=lts-alpine .
ARG IMAGE_SOURCE=node
ARG IMAGE_TAG=lts-alpine

FROM $IMAGE_SOURCE:$IMAGE_TAG

MAINTAINER Alexander Rogalskiy <github@AlexRogalskiy>

## General arguments
ARG LC_ALL="en_US.UTF-8"
ARG VERSION="0.0.0-dev"
ARG BUILD_DATE="$(git rev-parse --short HEAD)"
ARG VCS_REF="$(date -u +\"%Y-%m-%dT%H:%M:%SZ\")"

## Vercel token
ARG TOKEN

## Working directories
ARG APP_DIR="/usr/src/app"
ARG DATA_DIR="/usr/src/data"

## General metadata
LABEL "com.github.repository"="https://github.com/AlexRogalskiy/proverbs"
LABEL "com.github.homepage"="https://github.com/AlexRogalskiy/proverbs"
LABEL "com.github.maintainer"="Sensiblemetrics, Inc. <hello@sensiblemetrics.io> (https://sensiblemetrics.io)"

LABEL "com.github.version"="$VERSION"
LABEL "com.github.build-date"="$BUILD_DATE"
LABEL "com.github.vcs-ref"="$VCS_REF"

LABEL "com.github.name"="styled-proverbs"
LABEL "com.github.description"="Automatically generate styled SVG proverbs upon request"

## Setting environment variables
ENV APP_DIR $APP_DIR
ENV DATA_DIR $DATA_DIR
ENV LC_ALL $LC_ALL
ENV LANG $LC_ALL
ENV VERCEL_TOKEN $TOKEN

## Mounting volumes
VOLUME ["$APP_DIR"]

## Creating work directory
WORKDIR $APP_DIR

## Installing dependencies
RUN apk add --no-cache git

## Installing vercel
RUN npm i -g vercel

## Copying project sources
COPY .vercel*/ ./.vercel
COPY api/ ./api
COPY data/ ./data
COPY fonts/ ./fonts
COPY scripts/ ./scripts
COPY src/ ./src
COPY typings/ ./typings

COPY favicon.ico .
COPY .env-cmdrc.json .
COPY vercel.json .
COPY package.json .

## Installing project dependencies
RUN npm install

## Run format checking & linting
RUN npm run all

RUN yes | vercel --confirm --token $VERCEL_TOKEN

## Setting volumes
VOLUME /tmp

## Exposing ports
EXPOSE 3000

## Running package bundle
CMD ["npm", "run", "development:docker"]
