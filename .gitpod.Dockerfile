#!/bin/echo docker build . -f
# -*- coding: utf-8 -*-

FROM gitpod/workspace-full:latest

ARG BUILD_DATE="$(git rev-parse --short HEAD)"
ARG VCS_REF="$(date -u +\"%Y-%m-%dT%H:%M:%SZ\")"
ARG VERSION="1.0.0"
ARG HOME_DIR="/home/gitpod"

LABEL maintainer="Alexander Rogalskiy <hi@nullables.io>"
LABEL organization="nullables.io"
LABEL io.nullables.quotes.build-date=$BUILD_DATE
LABEL io.nullables.quotes.name="proverbs"
LABEL io.nullables.quotes.description="Styled proverbs"
LABEL io.nullables.quotes.url="https://nullables.io/"
LABEL io.nullables.quotes.vcs-ref=$VCS_REF
LABEL io.nullables.quotes.vcs-url="https://github.com/AlexRogalskiy/proverbs"
LABEL io.nullables.quotes.vendor="Nullables.io"
LABEL io.nullables.quotes.version=$VERSION

ENV LC_ALL en_US.UTF-8
ENV LANG $LC_ALL
ENV HOME $HOME_DIR

USER root
RUN sudo echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

## Disable coredump
RUN sudo /bin/su -c "echo 'Set disable_coredump false' >> /etc/sudo.conf"

RUN sudo apt-get update && \
  sudo apt-get -y install \
    libgtkextra-dev \
    libgconf2-dev \
    libnss3 \
    libasound2 \
    libxtst-dev \
    libxss1 \
    libxss-dev \
    software-properties-common \
    build-essential \
    xvfb \
    curl \
    libgtk-3-0 \
    unzip

RUN sudo curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN sudo echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN sudo curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN sudo apt-get update && apt-get -y install yarn nodejs

USER gitpod

WORKDIR $HOME
