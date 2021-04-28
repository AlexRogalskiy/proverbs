## Setting base OS layer
## docker build -t container_tag --build-arg IMAGE_SOURCE=node IMAGE_TAG=lts-alpine .
ARG IMAGE_SOURCE=node
ARG IMAGE_TAG=lts-alpine

FROM $IMAGE_SOURCE:$IMAGE_TAG

## Setting arguments
ARG VERSION="0.0.0-dev"
ARG VCS_REF="$(date -u +\"%Y-%m-%dT%H:%M:%SZ\")"
ARG BUILD_DATE="$(git rev-parse --short HEAD)"
ARG HOME_DIR="/usr/src/app"

## Vercel token
ARG TOKEN

## Setting metadata
LABEL version=$VERSION
LABEL vcs-ref=$VCS_REF
LABEL build-date=$BUILD_DATE

LABEL name="Styled proverbs"
LABEL description="Automatically generate styled SVG proverbs upon request"
LABEL repository="https://github.com/AlexRogalskiy/proverbs"
LABEL homepage="https://github.com/AlexRogalskiy"
LABEL maintainer="Nullables, Inc. <hello@nullables.io> (https://nullables.io)"

## Setting environment variables
ENV HOME $HOME_DIR
ENV LC_ALL en_US.UTF-8
ENV LANG $LC_ALL
ENV VERCEL_TOKEN $TOKEN

## Installing dependencies
RUN apk add --no-cache git

## Installing vercel
RUN npm i -g vercel

## Creating work directory
WORKDIR $HOME

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
RUN yes | vercel --confirm --token $VERCEL_TOKEN

## Setting volumes
VOLUME /tmp

## Exposing ports
EXPOSE 3000

## Running package bundle
CMD ["npm", "run", "develop:docker"]
